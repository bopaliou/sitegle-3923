import { useMemo, useState } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight, MapPin, Building2 } from "lucide-react";
import { projects, projectCategories, company } from "@/lib/site-data";
import { useReveal } from "@/hooks/use-reveal";
import { useSeo } from "@/lib/seo";
import NotFound from "./not-found";
import {
  Breadcrumb,
  Container,
  Cta,
  PageHero,
  RichBody,
  Section,
  SectionHead,
  VideoPlayer,
} from "@/components/site/bits";

/* ------------------------------------------------------------------- liste */

export default function Realisations() {
  const [active, setActive] = useState<string>("Toutes");
  useReveal();
  useSeo({
    title: "Réalisations — chantiers d'éclairage, réseaux et solaire | GLE",
    description:
      "Les chantiers livrés par Global Engineering SARL au Sénégal : éclairage public, réseaux électriques MT/BT, mini-centrales solaires de village et signalisation routière.",
    image: "/images/site/bourguiba-1.jpg",
  });

  const filters = ["Toutes", ...projectCategories];
  const visible = useMemo(
    () =>
      active === "Toutes"
        ? projects
        : projects.filter((project) => project.category === active),
    [active],
  );

  return (
    <>
      <PageHero
        eyebrow="Réalisations"
        title="Nos chantiers de référence au Sénégal"
        intro="Découvrez une sélection de nos réalisations en éclairage public, réseaux électriques et solaire, avec les photographies des ouvrages et les caractéristiques disponibles."
        image="/images/site/bourguiba-1.jpg"
        imageAlt="Candélabres d'éclairage public installés par GLE sur l'avenue Bourguiba à Dakar"
      />
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Réalisations" }]} />

      <Section tone="paper">
        <div className="flex flex-wrap items-center gap-2.5">
          {filters.map((filter) => {
            const isActive = filter === active;
            const count =
              filter === "Toutes"
                ? projects.length
                : projects.filter((project) => project.category === filter).length;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-2 font-display text-sm font-semibold transition-colors ${
                  isActive
                    ? "border-navy-900 bg-navy-900 text-white"
                    : "border-line bg-paper text-ink hover:border-navy hover:text-navy"
                }`}
              >
                {filter}
                <span className={isActive ? "ml-2 text-orange" : "ml-2 text-slate"}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <Link
              key={project.slug}
              href={`/realisations/${project.slug}`}
              className="group flex flex-col overflow-hidden rounded-[8px] border border-line transition-shadow hover:shadow-[0_24px_50px_-34px_rgba(14,26,51,0.65)]"
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <img
                  src={project.images[0]?.src}
                  alt={project.images[0]?.alt ?? project.title}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-navy-900/90 px-3 py-1 text-xs font-medium text-white">
                  {project.category}
                </span>
                {project.video ? (
                  <span className="absolute bottom-4 left-4 rounded-full bg-orange px-3 py-1 text-xs font-semibold text-navy-900">
                    Vidéo
                  </span>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-display text-base font-semibold text-navy-900">
                  {project.shortTitle}
                </h2>
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-slate">
                  <MapPin className="size-3.5 text-orange-700" />
                  {project.location}
                </p>
                <p className="mt-3 flex-1 text-sm text-slate">{project.summary}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-navy">
                  Voir le chantier
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="mt-10 text-sm text-slate">
            Aucune réalisation dans cette catégorie pour le moment.
          </p>
        ) : null}
      </Section>

      <Section tone="alt">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            eyebrow="Votre chantier"
            title="Un ouvrage similaire à réaliser ?"
            intro={`Nos équipes se déplacent sur l'ensemble du territoire. Contactez le bureau d'études — ${company.phone}.`}
          />
          <Cta href="/contact">Demander un devis</Cta>
        </div>
      </Section>
    </>
  );
}

/* ------------------------------------------------------------------ détail */

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const index = projects.findIndex((project) => project.slug === slug);
  const project = index >= 0 ? projects[index] : undefined;
  useReveal();
  useSeo({
    title: project
      ? `${project.shortTitle} — Réalisation GLE`
      : "Réalisation introuvable | GLE",
    description: project?.summary ?? "Réalisation introuvable",
    image: project?.images[0]?.src,
  });

  if (!project) return <NotFound />;

  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <PageHero
        eyebrow={project.category}
        title={project.title}
        intro={project.summary}
        image={project.images[0]?.src ?? "/images/site/rural-1.jpg"}
        imageAlt={project.images[0]?.alt ?? project.title}
      />
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Réalisations", href: "/realisations" },
          { label: project.shortTitle },
        ]}
      />

      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-[1.35fr_0.65fr]">
          <div>
            <div className="flex flex-wrap gap-6 border-b border-line pb-7 text-sm">
              {project.client ? (
                <p className="inline-flex items-center gap-2 text-slate">
                  <Building2 className="size-4 text-orange-700" />
                  {project.client}
                </p>
              ) : null}
              <p className="inline-flex items-center gap-2 text-slate">
                <MapPin className="size-4 text-orange-700" />
                {project.location}
              </p>
            </div>

            <div className="mt-10">
              <RichBody sections={project.sections} />
            </div>

            {project.video ? (
              <VideoPlayer
                className="reveal mt-12"
                src={project.video.src}
                poster={project.video.poster}
                captions={project.video.captions}
                label={`${project.shortTitle} — images du chantier`}
              />
            ) : null}

            <div className="mt-12">
              <h2 className="font-display text-lg font-semibold text-navy-900">
                Le chantier en images
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {project.images.map((image, imageIndex) => (
                  <figure
                    key={image.src}
                    className={`reveal overflow-hidden rounded-[8px] border border-line ${
                      imageIndex === 0 ? "sm:col-span-2" : ""
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className={`w-full object-cover ${
                        imageIndex === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
                      }`}
                    />
                    <figcaption className="px-4 py-3 text-xs text-slate">
                      {image.alt}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>

          <aside className="h-fit space-y-6 lg:sticky lg:top-28">
            <div className="rounded-[8px] border border-line bg-paper-alt p-7">
              <p className="eyebrow text-orange-700">Fiche technique</p>
              <dl className="mt-5 space-y-4">
                {project.specs.map((spec) => (
                  <div key={spec.label} className="border-b border-line pb-3 last:border-0">
                    <dt className="text-xs text-slate">{spec.label}</dt>
                    <dd className="mt-1 font-display text-sm font-semibold text-navy-900">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-[8px] bg-navy-900 p-7 text-white">
              <p className="eyebrow text-orange">Projet similaire</p>
              <p className="mt-4 text-sm text-white/75">
                Décrivez votre ouvrage : nous établissons un chiffrage et un
                planning d'exécution.
              </p>
              <Cta href="/contact" className="mt-6 w-full">
                Nous contacter
              </Cta>
            </div>
          </aside>
        </div>
      </Section>

      <div className="border-t border-line bg-paper-alt">
        <Container className="flex flex-wrap items-center justify-between gap-4 py-8">
          <Link
            href="/realisations"
            className="inline-flex items-center gap-2 font-display text-sm font-semibold text-navy hover:text-orange-700"
          >
            <ArrowLeft className="size-4" />
            Toutes les réalisations
          </Link>
          <Link
            href={`/realisations/${next.slug}`}
            className="inline-flex items-center gap-2 font-display text-sm font-semibold text-navy hover:text-orange-700"
          >
            Suivant : {next.shortTitle}
            <ArrowRight className="size-4" />
          </Link>
        </Container>
      </div>
    </>
  );
}
