import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  companyLifePhotos,
  fieldPhotos,
  mediaVideos,
  projects,
  projectCategories,
} from "@/lib/site-data";
import { useReveal } from "@/hooks/use-reveal";
import { useSeo } from "@/lib/seo";
import {
  Breadcrumb,
  Cta,
  PageHero,
  Section,
  SectionHead,
  VideoPlayer,
} from "@/components/site/bits";
import { cn } from "@/lib/utils";

type Photo = {
  src: string;
  alt: string;
  group: string;
  context: string;
  href?: string;
};

const LIFE_GROUP = "Vie de l'entreprise";

const allPhotos: Photo[] = [
  ...fieldPhotos.map((photo) => ({
    src: photo.src,
    alt: photo.caption,
    group: photo.group,
    context: photo.title,
  })),
  ...projects.flatMap((project) =>
    project.images.map((image) => ({
      src: image.src,
      alt: image.alt,
      group: project.category as string,
      context: project.shortTitle,
      href: `/realisations/${project.slug}`,
    })),
  ),
  ...companyLifePhotos.map((photo) => ({
    src: photo.src,
    alt: photo.alt,
    group: LIFE_GROUP,
    context: "Vie de l'entreprise",
  })),
];

/** Une même photo peut illustrer deux chantiers : on ne la garde qu'une fois. */
const photos: Photo[] = allPhotos.filter(
  (photo, index) => allPhotos.findIndex((item) => item.src === photo.src) === index,
);

const filters = ["Tout", ...projectCategories, LIFE_GROUP] as const;

export default function Mediatheque() {
  useReveal();
  useSeo({
    title: "Médiathèque — photos et vidéos de chantiers | Global Engineering SARL",
    description:
      "Photos et vidéos des chantiers de Global Engineering SARL : éclairage public, réseaux MT/BT, mini-centrales solaires, signalisation routière et vie de l'entreprise.",
    image: "/images/site/bourguiba-1.jpg",
  });

  const [filter, setFilter] = useState<string>("Tout");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === "Tout" ? photos : photos.filter((p) => p.group === filter)),
    [filter],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowRight")
        setLightbox((index) => (index === null ? null : (index + 1) % visible.length));
      if (event.key === "ArrowLeft")
        setLightbox((index) =>
          index === null ? null : (index - 1 + visible.length) % visible.length,
        );
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, visible.length]);

  const current = lightbox === null ? null : visible[lightbox];

  return (
    <>
      <PageHero
        eyebrow="Médiathèque"
        title="Nos chantiers en images et en vidéos"
        intro="Reportages de chantier, installations livrées et vie de l'entreprise : l'ensemble des photos et vidéos de Global Engineering, prises sur nos projets au Sénégal."
        image="/images/site/bourguiba-5.jpg"
        imageAlt="Équipe Global Engineering sur le chantier d'éclairage public de l'ouvrage d'art 14"
      />
      <Breadcrumb
        items={[{ label: "Accueil", href: "/" }, { label: "Médiathèque" }]}
      />

      {/* ------------------------------------------------------------- vidéos */}
      <Section tone="navy-deep">
        <SectionHead
          eyebrow="Vidéos"
          title="Cinq reportages tournés sur nos chantiers"
          intro="Électrification rurale, éclairage d'ouvrages d'art, tirage de câble souterrain : les travaux filmés sur site par nos équipes."
          invert
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {mediaVideos.map((video) => (
            <article key={video.src} className="reveal">
              <VideoPlayer
                src={video.src}
                poster={video.poster}
                captions={video.captions}
              />
              <h3 className="mt-5 font-display text-base font-semibold text-white">
                {video.title}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-orange">
                {video.location}
              </p>
              <p className="mt-3 text-sm text-white/70">{video.description}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------- photos */}
      <Section tone="paper">
        <SectionHead
          eyebrow="Photothèque"
          title={`${photos.length} photos de nos réalisations et de nos équipes`}
          intro="Filtrez par domaine d'intervention, puis cliquez sur une photo pour l'agrandir."
        />

        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((item) => {
            const count =
              item === "Tout"
                ? photos.length
                : photos.filter((p) => p.group === item).length;
            const active = filter === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setFilter(item);
                  setLightbox(null);
                }}
                className={cn(
                  "rounded-full border px-4 py-2 font-display text-xs font-semibold transition-colors",
                  active
                    ? "border-navy bg-navy text-white"
                    : "border-line text-slate hover:border-navy/40 hover:text-navy",
                )}
              >
                {item}
                <span className={cn("ml-2", active ? "text-white/60" : "text-slate/60")}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((photo, index) => (
            <button
              key={`${photo.src}-${photo.context}`}
              type="button"
              onClick={() => setLightbox(index)}
              className="group relative block overflow-hidden rounded-[8px] bg-navy-900 text-left"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/90 to-transparent px-3 pb-2.5 pt-8 text-[11px] font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {photo.context}
              </span>
            </button>
          ))}
        </div>
      </Section>

      <Section tone="alt">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <SectionHead
            eyebrow="Aller plus loin"
            title="Chaque photo correspond à un chantier documenté"
            intro="Les fiches de réalisation détaillent les quantités, les matériels installés et les maîtres d'ouvrage."
          />
          <div className="flex flex-wrap gap-3">
            <Cta href="/realisations">Voir les réalisations</Cta>
            <Cta href="/contact" variant="outline">
              Demander un devis
            </Cta>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- lightbox */}
      {current ? (
        <div
          aria-modal="true"
          aria-label={current.alt}
          className="fixed inset-0 z-[100] flex flex-col bg-navy-900/95 backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label="Fermer la visionneuse"
            tabIndex={-1}
            onClick={() => setLightbox(null)}
            className="absolute inset-0 size-full cursor-default"
          />
          <div className="relative flex items-center justify-between px-5 py-4 text-white sm:px-8">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-orange">
              {current.context}
              <span className="ml-3 font-normal normal-case tracking-normal text-white/50">
                {(lightbox ?? 0) + 1} / {visible.length}
              </span>
            </p>
            <button
              type="button"
              aria-label="Fermer"
              onClick={() => setLightbox(null)}
              className="inline-flex size-9 items-center justify-center rounded-full border border-white/25 text-white hover:bg-white/10"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="pointer-events-none relative flex min-h-0 flex-1 items-center justify-center gap-3 px-3 pb-6 sm:gap-6 sm:px-8 [&>*]:pointer-events-auto">
            <button
              type="button"
              aria-label="Photo précédente"
              onClick={() =>
                setLightbox((index) =>
                  index === null ? null : (index - 1 + visible.length) % visible.length,
                )
              }
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-white hover:bg-white/10"
            >
              <ChevronLeft className="size-5" />
            </button>

            <figure className="flex min-h-0 max-w-[900px] flex-1 flex-col items-center">
              <img
                src={current.src}
                alt={current.alt}
                className="max-h-[70vh] w-auto max-w-full rounded-[8px] object-contain"
              />
              <figcaption className="mt-4 text-center text-sm text-white/70">
                {current.alt}
                {current.href ? (
                  <Link
                    href={current.href}
                    className="ml-3 inline-flex items-center gap-1 font-display text-xs font-semibold text-orange hover:underline"
                  >
                    <ArrowRight className="size-3" />
                    Voir le chantier
                  </Link>
                ) : null}
              </figcaption>
            </figure>

            <button
              type="button"
              aria-label="Photo suivante"
              onClick={() =>
                setLightbox((index) =>
                  index === null ? null : (index + 1) % visible.length,
                )
              }
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-white hover:bg-white/10"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
