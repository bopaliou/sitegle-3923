import { Quote, Target, Compass } from "lucide-react";
import {
  company,
  companyLifePhotos,
  fieldPhotos,
  keyFigures,
  partners,
  values,
} from "@/lib/site-data";
import { useReveal } from "@/hooks/use-reveal";
import { useSeo } from "@/lib/seo";
import {
  Breadcrumb,
  Container,
  Cta,
  PageHero,
  Section,
  SectionHead,
  Stat,
} from "@/components/site/bits";

const identity = [
  { label: "Raison sociale", value: company.legalName },
  { label: "Date de création", value: company.founded },
  { label: "Capital social", value: company.capital },
  { label: "Siège social", value: company.address },
  { label: "Direction", value: `${company.director} — ${company.directorRole}` },
  { label: "Domaines", value: company.tagline },
];

export default function APropos() {
  useReveal();
  useSeo({
    title: "À propos — Global Engineering SARL, entreprise sénégalaise depuis 2016",
    description:
      "Créée en décembre 2016 à Dakar et dirigée par M. Kebe Carama Mbaye, Global Engineering SARL réalise des projets d'énergie renouvelable et de réseaux électriques MT/BT au Sénégal.",
    image: "/images/site/equipe-3.jpg",
  });

  return (
    <>
      <PageHero
        eyebrow="À propos"
        title="Une équipe d'ingénieurs et de techniciens au service de l'énergie"
        intro="Global Engineering SARL accompagne institutions, collectivités et industriels du Sénégal dans la production d'énergie renouvelable et la construction de réseaux électriques fiables."
        image="/images/site/equipe-3.jpg"
        imageAlt="Réunion des équipes de Global Engineering en tenue de chantier"
      />
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "À propos" }]} />

      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <SectionHead
              eyebrow="Notre histoire"
              title="Née en 2016 d'une conviction : l'accès à l'énergie change tout"
            />
            <p className="reading mt-7 text-slate">
              GLOBAL ENGINEERING (GLE) est une société de droit sénégalais créée en{" "}
              {company.founded.toLowerCase()}, au capital de {company.capital}, dont le
              siège est établi à Dakar. Elle est spécialisée dans les énergies
              renouvelables — solaire photovoltaïque, éolien, biomasse — et dans les
              travaux d'électricité et de réseaux moyenne et basse tension.
            </p>
            <p className="reading mt-5 text-slate">
              Depuis sa création, l'entreprise a bâti son savoir-faire sur les
              chantiers d'électrification rurale, d'éclairage public et de
              signalisation routière confiés par les grands maîtres d'ouvrage du pays,
              en réunissant bureau d'études, logistique d'approvisionnement et équipes
              de pose au sein d'une même structure.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <div className="reveal rounded-[8px] border border-line bg-paper-alt p-7">
                <span className="inline-flex size-10 items-center justify-center rounded-[8px] bg-white text-navy">
                  <Target className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-base font-semibold text-navy-900">
                  Notre mission
                </h3>
                <p className="mt-3 text-sm text-slate">
                  Fournir des solutions énergétiques durables et des infrastructures
                  électriques fiables, adaptées aux besoins réels de chaque client et
                  de chaque territoire.
                </p>
              </div>
              <div className="reveal rounded-[8px] border border-line bg-paper-alt p-7">
                <span className="inline-flex size-10 items-center justify-center rounded-[8px] bg-white text-navy">
                  <Compass className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-base font-semibold text-navy-900">
                  Notre vision
                </h3>
                <p className="mt-3 text-sm text-slate">
                  Contribuer activement à la transition énergétique du Sénégal et de
                  l'Afrique, en rendant l'énergie propre accessible jusqu'aux villages
                  les plus isolés.
                </p>
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-[8px] border border-line p-7 lg:sticky lg:top-28">
            <p className="eyebrow text-orange-700">Identité de l'entreprise</p>
            <dl className="mt-5 space-y-4">
              {identity.map((item) => (
                <div key={item.label} className="border-b border-line pb-3 last:border-0">
                  <dt className="text-xs text-slate">{item.label}</dt>
                  <dd className="mt-1 text-sm font-medium text-navy-900">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </Section>

      <div className="border-y border-line bg-paper">
        <Container className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-5">
          {keyFigures.map((figure) => (
            <Stat key={figure.label} value={figure.value} label={figure.label} />
          ))}
        </Container>
      </div>

      {/* ---------------------------------------------------------- direction */}
      <Section tone="navy-deep">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <img
            src="/images/site/equipe-1.jpg"
            alt="Assemblée réunissant les équipes et les habitants lors d'un projet GLE"
            className="reveal aspect-[4/3] w-full rounded-[8px] object-cover"
          />
          <div>
            <Quote className="size-8 text-orange" />
            <p className="mt-6 font-display text-lg leading-snug text-white sm:text-xl">
              « Chaque village raccordé, chaque rue éclairée change la vie
              quotidienne de milliers de personnes. C'est ce qui donne du sens à
              notre métier d'ingénieur. »
            </p>
            <p className="mt-7 font-display text-sm font-semibold text-white">
              {company.director}
            </p>
            <p className="text-xs text-white/60">{company.directorRole}</p>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------- équipe */}
      <Section tone="paper">
        <SectionHead
          eyebrow="Notre équipe"
          title="Les femmes et les hommes qui font tourner les chantiers"
          intro="Direction, bureau d'études, QHSE, achats et administration : une structure complète réunie au siège de Dakar, en appui permanent des équipes de pose."
        />
      </Section>

      {/* ------------------------------------------------- vie de l'entreprise */}
      <Section tone="alt">
        <div className="mb-16 grid gap-8 lg:grid-cols-2 lg:items-center">
          <img
            src="/images/site/visite-usine-sunlight-grece.jpg"
            alt="Accueil de Global Engineering à l'usine Sunlight en Grèce pour une visite de réception qualité"
            loading="lazy"
            className="reveal mx-auto max-h-[520px] w-full rounded-[8px] object-contain"
          />
          <div>
            <SectionHead
              eyebrow="Réception qualité"
              title="Visite de l'usine Sunlight en Grèce"
            />
            <p className="reading mt-6 text-slate">
              Global Engineering a effectué une visite de l'usine Sunlight en
              Grèce dans le cadre d'une réception qualité. Ce déplacement
              s'inscrit dans notre démarche de suivi de la qualité des
              équipements auprès des fabricants.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="Vie de l'entreprise"
            title="Séminaires, formations et travail au quotidien"
            intro="Les équipes GLE se retrouvent régulièrement pour les points sécurité, les formations internes et le séminaire annuel."
          />
          <Cta href="/mediatheque" variant="outline">
            Voir la médiathèque
          </Cta>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {companyLifePhotos.filter((photo) => photo.src !== "/images/site/visite-usine-sunlight-grece.jpg").slice(0, 6).map((photo) => (
            <img
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="reveal aspect-[4/3] w-full rounded-[8px] object-cover"
            />
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------ valeurs */}
      <Section tone="paper">
        <SectionHead
          eyebrow="Sur le terrain"
          title="Le savoir-faire en images, les moyens en action"
          intro="Installations électriques en Casamance, présence des équipes et logistique de chantier : découvrez les coulisses des interventions de Global Engineering."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {fieldPhotos.map((photo) => (
            <figure key={photo.src} className="reveal overflow-hidden rounded-[8px] border border-line">
              <div className="flex h-[340px] items-center justify-center bg-paper-alt p-3">
                <img src={photo.src} alt={photo.caption} loading="lazy" className="h-full w-full object-contain" />
              </div>
              <figcaption className="p-6">
                <h3 className="font-display text-lg font-semibold text-navy-900">{photo.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{photo.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <SectionHead
          eyebrow="Nos valeurs"
          title="Cinq engagements qui structurent nos décisions"
          intro="Elles s'appliquent autant à la conduite des chantiers qu'à la relation avec nos clients, nos fournisseurs et les communautés où nous travaillons."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <article
              key={value.title}
              className="reveal rounded-[8px] border border-line p-7"
            >
              <p className="font-display text-2xl font-bold text-line">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-base font-semibold text-navy-900">
                {value.title}
              </h3>
              <p className="mt-3 text-sm text-slate">{value.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* -------------------------------------------------------- partenaires */}
      <Section tone="alt">
        <SectionHead
          eyebrow="Références"
          title="Nos clients et partenaires"
          intro="Agences publiques, concessionnaires, ONG internationales et industriels nous confient leurs projets d'énergie et de réseaux."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex h-20 items-center justify-center rounded-[8px] border border-line bg-white px-4"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                className="max-h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Cta href="/realisations">Voir nos réalisations</Cta>
          <Cta href="/contact" variant="outline">
            Travailler avec GLE
          </Cta>
        </div>
      </Section>
    </>
  );
}
