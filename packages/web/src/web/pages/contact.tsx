import { useState } from "react";
import {
  FileText,
  Gavel,
  Handshake,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Clock,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  company,
  contactSubjects,
  howHeardOptions,
  type ContactSubject,
} from "@/lib/site-data";
import { useSubmitContact } from "@/queries/contact";
import { useSeo } from "@/lib/seo";
import { Breadcrumb, Cta, PageHero, Section } from "@/components/site/bits";

const subjectIcons = {
  "file-text": FileText,
  gavel: Gavel,
  handshake: Handshake,
} as const;

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  "Immeuble Silene appartement 7A Amitie 2 Dakar Senegal",
)}&output=embed`;

const labelClass = "block font-display text-xs font-semibold text-navy-900";
const fieldClass =
  "mt-2 w-full rounded-[6px] border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-slate/60 focus:border-navy";

export default function Contact() {
  const [subject, setSubject] = useState<ContactSubject>("devis");
  const [form, setForm] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    location: "",
    message: "",
    howHeard: "",
    website: "",
  });
  const submit = useSubmitContact();

  useSeo({
    title: "Contact — devis, appels d'offres, partenariats | Global Engineering SARL",
    description: `Contactez Global Engineering SARL à Dakar : ${company.phone}, ${company.email}. Demande de devis, consultation sur appel d'offres ou proposition de fourniture.`,
    image: "/images/site/camberene-1.jpg",
  });

  const activeSubject = contactSubjects.find((item) => item.value === subject);

  const update = (key: keyof typeof form) => (value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit.mutate({
      subject,
      name: form.name,
      organization: form.organization || undefined,
      email: form.email,
      phone: form.phone || undefined,
      location: form.location || undefined,
      message: form.message,
      howHeard: form.howHeard || undefined,
      website: form.website || undefined,
    });
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre projet"
        intro="Trois parcours, un seul formulaire : demande de devis, consultation sur appel d'offres ou proposition de fourniture. Nous répondons sous 48 heures ouvrées."
        image="/images/site/camberene-1.jpg"
        imageAlt="Rue équipée en éclairage public par les équipes de GLE"
      />
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Contact" }]} />

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          {/* ------------------------------------------------------ formulaire */}
          <div>
            <p className="eyebrow text-orange-700">Votre demande</p>
            <h2 className="mt-4 text-lg font-semibold text-navy-900">
              Choisissez le motif de votre message
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {contactSubjects.map((item) => {
                const Icon = subjectIcons[item.icon];
                const active = item.value === subject;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setSubject(item.value)}
                    aria-pressed={active}
                    className={`rounded-[8px] border p-5 text-left transition-colors ${
                      active
                        ? "border-navy bg-navy/5"
                        : "border-line bg-paper hover:border-navy/40"
                    }`}
                  >
                    <span
                      className={`inline-flex size-9 items-center justify-center rounded-[6px] ${
                        active ? "bg-orange text-navy-900" : "bg-navy/8 text-navy"
                      }`}
                    >
                      <Icon className="size-4" />
                    </span>
                    <span className="mt-4 block font-display text-sm font-semibold text-navy-900">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {activeSubject ? (
              <p className="mt-5 rounded-[8px] bg-paper-alt px-5 py-4 text-sm text-slate">
                {activeSubject.description}
              </p>
            ) : null}

            {submit.isSuccess ? (
              <div className="mt-8 rounded-[8px] border border-line bg-paper-alt p-8">
                <CheckCircle2 className="size-8 text-orange-700" />
                <h3 className="mt-4 font-display text-base font-semibold text-navy-900">
                  Message envoyé — merci {form.name.split(" ")[0] || ""}.
                </h3>
                <p className="mt-3 text-sm text-slate">
                  Votre demande est enregistrée. Notre équipe revient vers vous sous
                  48 heures ouvrées. Pour une urgence de chantier, appelez le{" "}
                  <a href={company.phoneHref} className="font-medium text-navy">
                    {company.phone}
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => {
                    submit.reset();
                    setForm({
                      name: "",
                      organization: "",
                      email: "",
                      phone: "",
                      location: "",
                      message: "",
                      howHeard: "",
                      website: "",
                    });
                  }}
                  className="mt-6 font-display text-sm font-semibold text-navy hover:text-orange-700"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
                {/* Champ piège anti-spam : invisible pour les visiteurs. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
                  <label htmlFor="website">Site web</label>
                  <input
                    id="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(event) => update("website")(event.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="name">
                    Nom et prénom *
                  </label>
                  <input
                    id="name"
                    aria-label="Nom et prénom"
                    required
                    minLength={2}
                    value={form.name}
                    onChange={(event) => update("name")(event.target.value)}
                    className={fieldClass}
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="organization">
                    Structure / entreprise
                  </label>
                  <input
                    id="organization"
                    aria-label="Structure ou entreprise"
                    value={form.organization}
                    onChange={(event) => update("organization")(event.target.value)}
                    className={fieldClass}
                    placeholder="Nom de votre organisation"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="email">
                    Adresse e-mail *
                  </label>
                  <input
                    id="email"
                    aria-label="Adresse e-mail"
                    type="email"
                    required
                    value={form.email}
                    onChange={(event) => update("email")(event.target.value)}
                    className={fieldClass}
                    placeholder="vous@exemple.com"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="phone">
                    Téléphone
                  </label>
                  <input
                    id="phone"
                    aria-label="Téléphone"
                    value={form.phone}
                    onChange={(event) => update("phone")(event.target.value)}
                    className={fieldClass}
                    placeholder="+221 ..."
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="location">
                    Localisation du projet
                  </label>
                  <input
                    id="location"
                    aria-label="Localisation du projet"
                    value={form.location}
                    onChange={(event) => update("location")(event.target.value)}
                    className={fieldClass}
                    placeholder="Ville, région"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="howHeard">
                    Comment nous avez-vous connus ?
                  </label>
                  <select
                    id="howHeard"
                    aria-label="Comment nous avez-vous connus ?"
                    value={form.howHeard}
                    onChange={(event) => update("howHeard")(event.target.value)}
                    className={fieldClass}
                  >
                    <option value="">Sélectionnez une réponse</option>
                    {howHeardOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="message">
                    Votre message *
                  </label>
                  <textarea
                    id="message"
                    aria-label="Votre message"
                    required
                    minLength={10}
                    rows={6}
                    value={form.message}
                    onChange={(event) => update("message")(event.target.value)}
                    className={fieldClass}
                    placeholder={
                      subject === "devis"
                        ? "Décrivez l'installation souhaitée, la puissance ou les quantités, le calendrier..."
                        : subject === "appel-offres"
                          ? "Objet de la consultation, référence du dossier, date limite de remise des offres..."
                          : "Votre activité, les équipements ou prestations proposés, vos références..."
                    }
                  />
                </div>

                {submit.isError ? (
                  <p className="flex items-center gap-2 text-sm text-orange-700 sm:col-span-2">
                    <AlertCircle className="size-4" />
                    L'envoi a échoué. Vérifiez les champs et réessayez, ou écrivez-nous
                    à {company.email}.
                  </p>
                ) : null}

                <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                  <button
                    type="submit"
                    disabled={submit.isPending}
                    className="inline-flex items-center gap-2 rounded-full bg-orange px-7 py-3 font-display text-sm font-semibold text-navy-900 transition-colors hover:bg-orange-700 hover:text-white disabled:opacity-60"
                  >
                    {submit.isPending ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : null}
                    Envoyer ma demande
                  </button>
                  <p className="text-xs text-slate">
                    Les champs marqués * sont obligatoires.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* -------------------------------------------------------- contacts */}
          <aside className="space-y-6">
            <div className="rounded-[8px] bg-navy-900 p-7 text-white">
              <p className="eyebrow text-orange">Coordonnées</p>
              <ul className="mt-5 space-y-4 text-sm text-white/75">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-orange" />
                  <span>{company.address}</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-orange" />
                  <a href={company.phoneHref} className="hover:text-white">
                    {company.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <MessageCircle className="mt-0.5 size-4 shrink-0 text-orange" />
                  <a
                    href={`https://wa.me/${company.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white"
                  >
                    WhatsApp {company.whatsappDisplay}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-orange" />
                  <a href={`mailto:${company.email}`} className="hover:text-white">
                    {company.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-orange" />
                  <span>{company.hours}</span>
                </li>
              </ul>
              <Cta
                href={`https://wa.me/${company.whatsapp}`}
                variant="primary"
                icon={false}
                className="mt-7 w-full"
              >
                Discuter sur WhatsApp
              </Cta>
            </div>

            <div className="overflow-hidden rounded-[8px] border border-line">
              <iframe
                title="Localisation du siège de Global Engineering SARL à Dakar"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[300px] w-full border-0"
              />
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
