import { useMutation } from "@tanstack/react-query";
import { client } from "../lib/api";

export type ContactSubmission = {
  subject: "devis" | "appel-offres" | "fournisseur";
  name: string;
  organization?: string;
  email: string;
  phone?: string;
  location?: string;
  message: string;
  howHeard?: string;
  /** Champ piège anti-spam : doit rester vide. */
  website?: string;
};

// Data hooks live here, one file per feature — each wraps its query/mutation
// options (staleTime, select, invalidation) so components just call the hook.
// En production (hébergement mutualisé), le formulaire est traité par
// public/contact.php : envoi d'un e-mail et enregistrement MySQL facultatif.
// Dans l'aperçu Runable (pas de PHP), on se rabat sur l'API oRPC contact.submit.
const post = (input: ContactSubmission) =>
  fetch("/contact.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

export function useSubmitContact() {
  return useMutation({
    mutationFn: async (input: ContactSubmission) => {
      let response = await post(input);

      // L'anti-robots de l'hébergeur répond 409 avec un script qui pose un
      // cookie puis recharge la page : on pose ce cookie et on renvoie.
      if (response.status === 409) {
        const cookie = (await response.text()).match(/document\.cookie\s*=\s*"([^"]+)"/)?.[1];
        if (cookie) {
          document.cookie = `${cookie}; path=/`;
          response = await post(input);
        }
      }

      const isPhpReply = response.headers.get("content-type")?.includes("application/json");
      if (!isPhpReply && (response.status === 404 || response.status === 405 || response.ok)) {
        if (input.website) return { id: null, receivedAt: new Date().toISOString() };
        const { website: _honeypot, ...submission } = input;
        const result = await client.contact.submit(submission);
        return { id: result.id, receivedAt: new Date(result.receivedAt).toISOString() };
      }

      if (!response.ok) throw new Error(`Envoi refusé (${response.status})`);
      return (await response.json()) as { id: string | null; receivedAt: string };
    },
  });
}
