import { z } from "zod";
import { base } from "../__core/app";
import { db } from "../database";
import * as schema from "../database/schema";

const submissionInput = z.object({
  subject: z.enum(["devis", "appel-offres", "fournisseur"]),
  name: z.string().min(2).max(120),
  organization: z.string().max(160).optional(),
  email: z.string().email().max(160),
  phone: z.string().max(40).optional(),
  location: z.string().max(160).optional(),
  message: z.string().min(10).max(4000),
  howHeard: z.string().max(80).optional(),
});

export const contact = {
  /** Enregistre une demande envoyée depuis /contact. */
  submit: base.input(submissionInput).handler(async ({ input }) => {
    const [row] = await db
      .insert(schema.contactSubmissions)
      .values({
        subject: input.subject,
        name: input.name.trim(),
        organization: input.organization?.trim() || null,
        email: input.email.trim().toLowerCase(),
        phone: input.phone?.trim() || null,
        location: input.location?.trim() || null,
        message: input.message.trim(),
        howHeard: input.howHeard || null,
      })
      .returning();

    return { id: row?.id ?? null, receivedAt: new Date() };
  }),
};
