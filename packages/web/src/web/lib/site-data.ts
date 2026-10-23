/**
 * Contenu réel de Global Engineering SARL (GLE), repris du site existant
 * globalengineering.sn (pages Services, À propos, Réalisations, Blog, Contact)
 * et restructuré selon les recommandations de l'audit.
 */

export const company = {
  legalName: "GLOBAL ENGINEERING SARL",
  shortName: "GLE",
  tagline: "Énergies renouvelables & réseaux électriques MT/BT",
  claim: "L'énergie qui relie les territoires du Sénégal",
  founded: "Décembre 2016",
  capital: "10 000 000 FCFA",
  director: "M. Kebe Carama Mbaye",
  directorRole: "Directeur Général et Fondateur",
  address: "Immeuble Silène, appartement 7A, Amitié 2, Dakar, Sénégal",
  phone: "+221 33 864 18 83",
  phoneHref: "tel:+221338641883",
  whatsapp: "221771670304",
  whatsappDisplay: "+221 77 167 03 04",
  email: "contact@globalengineering.sn",
  hours: "Du lundi au vendredi — 8h à 13h & 14h à 17h",
  social: {
    linkedin: "https://www.linkedin.com/company/globalengineering-sarl/",
    facebook: "https://www.facebook.com/globalengineeringsarl",
    instagram: "https://www.instagram.com/global_engineerings_officiel",
  },
} as const;

/* ------------------------------------------------------------ implantations */

export type Office = {
  id: string;
  kind: string;
  legalName: string;
  city: string;
  country: string;
  address: string;
  phone: string;
  phoneHref: string;
};

export const offices: Office[] = [
  {
    id: "dakar",
    kind: "Siège social",
    legalName: "GLOBAL ENGINEERING SARL",
    city: "Dakar",
    country: "Sénégal",
    address: "Immeuble Silène, appartement 7A, Amitié 2, Dakar, Sénégal",
    phone: "+221 33 864 18 83",
    phoneHref: "tel:+221338641883",
  },
  {
    id: "nouakchott",
    kind: "Succursale",
    legalName: "GLOBAL ENGINEERING MAURITANIE",
    city: "Nouakchott",
    country: "Mauritanie",
    address: "N° 70 — NOT EXT MD F, Tevragh Zeina, Nouakchott, Mauritanie",
    phone: "+222 30 56 36 58",
    phoneHref: "tel:+22230563658",
  },
];

export const keyFigures = [
  { value: "2016", label: "Année de création" },
  { value: "2", label: "Pays d'implantation" },
  { value: "10", label: "Régions d'intervention" },
  { value: "372", label: "Villages électrifiés" },
  { value: "28", label: "Projets livrés" },
] as const;

export const navigation = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Médiathèque", href: "/mediatheque" },
  { label: "À propos", href: "/a-propos" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

/* ------------------------------------------------------------------ services */

export type Service = {
  slug: string;
  name: string;
  short: string;
  icon: "sun" | "wind" | "leaf" | "plug" | "package";
  paragraphs: string[];
  bullets?: string[];
  image: string;
};

export const services: Service[] = [
  {
    slug: "solaire-photovoltaique",
    name: "Énergie solaire photovoltaïque",
    short:
      "Conception, installation et maintenance de systèmes photovoltaïques : centrales au sol ou en toiture, mini-centrales, pompage solaire.",
    icon: "sun",
    image: "/images/site/villages-2.jpg",
    paragraphs: [
      "Notre expertise se concentre avant tout sur la conception, l'installation et la maintenance de systèmes solaires photovoltaïques de haute qualité.",
      "Grâce à l'utilisation de technologies de pointe, nous maximisons l'efficacité énergétique tout en minimisant l'impact environnemental. Notre objectif est de fournir des solutions durables, adaptées aux besoins spécifiques de chaque client.",
      "Ainsi, nous contribuons activement à la transition énergétique du Sénégal et, plus largement, de l'Afrique vers un avenir plus vert et plus durable.",
    ],
    bullets: [
      "Centrales solaires photovoltaïques au sol ou en toiture",
      "Mini-centrales solaires et micro-réseaux de village",
      "Systèmes de pompage solaire : irrigation, abreuvement du bétail, piscine",
      "Lampadaires solaires et chauffe-eau solaires",
    ],
  },
  {
    slug: "eolien",
    name: "Énergie éolienne",
    short:
      "Étude de faisabilité, conception, installation et maintenance de parcs éoliens adaptés au climat sénégalais.",
    icon: "wind",
    image: "/images/site/rural-3.jpg",
    paragraphs: [
      "Au sein de GLOBAL ENGINEERING (GLE), notre engagement en faveur de l'énergie éolienne reflète notre vision innovante et notre ambition pour un avenir durable.",
      "Nous mettons en œuvre des solutions éoliennes avancées, soigneusement adaptées aux spécificités climatiques et géographiques du Sénégal.",
      "Notre expertise couvre l'ensemble du processus : étude de faisabilité, conception, installation et maintenance de parcs éoliens. Nous optimisons la production d'énergie tout en minimisant les impacts environnementaux, contribuant à l'indépendance énergétique du pays et à la réduction des émissions de CO₂.",
    ],
  },
  {
    slug: "biomasse",
    name: "Énergie issue de la biomasse",
    short:
      "Valorisation des ressources biologiques locales pour produire électricité et chaleur, et réduire la dépendance aux fossiles.",
    icon: "leaf",
    image: "/images/site/rural-2.jpg",
    paragraphs: [
      "L'énergie issue de la biomasse représente un pilier essentiel de notre offre en énergies renouvelables et une solution durable pour l'avenir.",
      "Nous nous engageons dans la valorisation de la biomasse pour la production d'énergie, en utilisant des ressources biologiques locales afin de générer à la fois de l'électricité et de la chaleur.",
      "Cette approche réduit la dépendance aux combustibles fossiles, valorise les déchets organiques et soutient l'économie locale. Nos solutions en biomasse sont conçues pour être performantes et respectueuses de l'écosystème, garantissant un impact positif à long terme.",
    ],
  },
  {
    slug: "electricite-reseaux",
    name: "Électricité & réseaux MT/BT",
    short:
      "Études, fournitures et réalisation de réseaux électriques moyenne et basse tension, éclairage public et circuits industriels.",
    icon: "plug",
    image: "/images/site/rural-6.jpg",
    paragraphs: [
      "Un partenaire de confiance pour l'installation de vos circuits électriques. Notre équipe fournit et installe une vaste gamme d'équipements électriques, répondant aux exigences variées du secteur industriel.",
      "Conscients que chaque industrie a des besoins spécifiques, nous concevons des solutions adaptées afin d'offrir une performance optimale.",
      "Notre engagement envers la fiabilité et l'efficacité garantit une infrastructure électrique fonctionnelle, essentielle à la croissance et au succès de votre entreprise.",
    ],
    bullets: [
      "Études, fournitures et réalisation de réseaux électriques MT/BT",
      "Extensions de réseaux basse tension aériennes et souterraines",
      "Éclairage public : candélabres, projecteurs LED, coffrets de raccordement",
      "Fourniture et pose de feux tricolores et signalisation routière",
    ],
  },
  {
    slug: "fournitures-solaires",
    name: "Fournitures & vente d'équipements solaires",
    short:
      "Vente, réparation et installation de tous types d'équipements solaires, avec solutions hybrides pour une performance optimale.",
    icon: "package",
    image: "/images/site/villages-3.jpg",
    paragraphs: [
      "Votre partenaire de confiance en solutions solaires. Notre entreprise vous accompagne dans la vente, la réparation et l'installation de tous types d'équipements solaires.",
      "Grâce à notre expertise, nous garantissons une utilisation efficace de l'énergie solaire pour répondre à vos besoins énergétiques.",
    ],
    bullets: [
      "Fourniture et installation de centrales et mini-centrales solaires",
      "Panneaux et mini-panneaux solaires photovoltaïques",
      "Hybridation de centrales solaires photovoltaïques avec le biogaz",
      "Centrales mixtes combinant l'énergie solaire et éolienne",
    ],
  },
];

/* -------------------------------------------------------------- réalisations */

export const projectCategories = [
  "Éclairage public",
  "Réseaux MT/BT",
  "Solaire photovoltaïque",
  "Signalisation routière",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  category: ProjectCategory;
  client?: string;
  location: string;
  summary: string;
  specs: { label: string; value: string }[];
  sections: { heading: string; body: string[]; bullets?: string[] }[];
  images: { src: string; alt: string }[];
  video?: { src: string; poster: string; captions: string };
};

export const projects: Project[] = [
  {
    slug: "eclairage-autopont-keur-massar",
    title: "Réalisation de l'éclairage de l'autopont de Keur Massar",
    shortTitle: "Autopont de Keur Massar",
    category: "Éclairage public",
    location: "Keur Massar, Sénégal",
    summary:
      "Éclairage de l'autopont de Keur Massar : candélabres le long de la chaussée et luminaires installés sous le tablier de l'ouvrage.",
    specs: [
      { label: "Ouvrage", value: "Autopont de Keur Massar" },
      { label: "Intervention", value: "Éclairage public" },
      { label: "Équipements", value: "Candélabres et luminaires sous tablier" },
    ],
    sections: [
      {
        heading: "L'éclairage de la chaussée et du dessous de l'ouvrage",
        body: [
          "Global Engineering a réalisé l'éclairage de l'autopont de Keur Massar. Les candélabres disposés le long de la chaussée accompagnent les voies de circulation et les accès à l'ouvrage.",
          "Des luminaires sont également installés sous le tablier, sur la structure métallique de l'autopont. Les deux photographies présentent la vue d'ensemble de la chaussée équipée et un détail de l'éclairage sous l'ouvrage.",
        ],
      },
    ],
    images: [
      { src: "/images/site/keur-massar-1.jpg", alt: "Vue de l'autopont de Keur Massar équipé de candélabres le long de la chaussée" },
      { src: "/images/site/keur-massar-2.jpg", alt: "Luminaires allumés fixés à la structure métallique sous le tablier de l'autopont de Keur Massar" },
    ],
  },
  {
    slug: "electrification-rurale-reseaux-electriques",
    title:
      "Électrification rurale et réhabilitation de réseaux électriques",
    shortTitle: "Électrification rurale ASER",
    category: "Réseaux MT/BT",
    client: "ASER — Agence Sénégalaise d'Électrification Rurale",
    location: "10 régions du Sénégal",
    summary:
      "Extension et réhabilitation de réseaux électriques dans dix régions du pays, pour raccorder les villages et sécuriser la distribution existante.",
    specs: [
      { label: "Maître d'ouvrage", value: "ASER" },
      { label: "Régions couvertes", value: "10" },
      { label: "Nature", value: "Réseaux MT/BT, raccordements" },
    ],
    sections: [
      {
        heading: "Un chantier à l'échelle nationale",
        body: [
          "GLE intervient sur l'électrification rurale et la réhabilitation des réseaux électriques pour le compte de l'ASER. Le périmètre couvre dix régions du Sénégal, des zones enclavées de Casamance aux villages du bassin arachidier.",
          "Les travaux associent construction de lignes, remplacement d'équipements vétustes, raccordement des abonnés et mise en conformité des ouvrages existants.",
        ],
        bullets: [
          "Diourbel",
          "Fatick",
          "Kaolack",
          "Kolda",
          "Saint-Louis",
          "Thiès",
          "Ziguinchor",
          "Kédougou",
          "Kaffrine",
          "Tambacounda",
        ],
      },
    ],
    images: [
      { src: "/images/site/rural-2.jpg", alt: "Réseau électrique le long d'une route rurale au Sénégal" },
      { src: "/images/site/rural-6.jpg", alt: "Deux techniciens GLE en intervention sur un poteau électrique" },
      { src: "/images/site/rural-3.jpg", alt: "Poteau électrique équipé après réhabilitation du réseau" },
      { src: "/images/site/rural-4.jpg", alt: "Ligne moyenne tension réhabilitée par GLE" },
      { src: "/images/site/rural-5.jpg", alt: "Support béton et armement de ligne basse tension" },
      { src: "/images/site/rural-7.jpg", alt: "Onduleurs et coffrets installés en local technique" },
      { src: "/images/site/rural-8.jpg", alt: "Poteau équipé d'un transformateur en zone rurale" },
      { src: "/images/site/rural-9.jpg", alt: "Ligne électrique traversant un village électrifié par GLE" },
      { src: "/images/site/rural-10.jpg", alt: "Tête de poteau moyenne tension avec isolateurs et armement" },
    ],
    video: {
      src: "/videos/electrification-rurale.mp4",
      poster: "/images/posters/electrification-rurale.jpg",
      captions: "/videos/electrification-rurale.vtt",
    },
  },
  {
    slug: "133-villages-mini-centrales-solaires",
    title:
      "Construction de 133 villages par mini-centrale solaire",
    shortTitle: "133 villages en mini-centrales solaires",
    category: "Solaire photovoltaïque",
    client: "ASER — Agence Sénégalaise d'Électrification Rurale",
    location: "133 villages, Sénégal",
    summary:
      "Réalisation de mini-centrales solaires photovoltaïques pour alimenter 133 villages : génie civil, structures, pose des modules, mise à la terre et locaux techniques.",
    specs: [
      { label: "Maître d'ouvrage", value: "ASER" },
      { label: "Villages", value: "133" },
      { label: "Technologie", value: "Mini-centrales solaires PV" },
    ],
    sections: [
      {
        heading: "De la fouille au réseau de village",
        body: [
          "Chaque site suit la même chaîne d'exécution : préparation du terrain, pose des structures porteuses, montage des modules photovoltaïques, puis raccordement du local technique abritant onduleurs et parc de batteries.",
          "Le volet sécurité électrique occupe une place centrale : pose de chemins de câble, fouille des puits de terre et réalisation des mises à la terre conformes avant toute mise sous tension.",
        ],
        bullets: [
          "Pose de chemin de câble",
          "Fouille de puits de terre",
          "Mise à la terre des installations",
          "Montage des structures et des modules PV",
        ],
      },
      {
        heading: "Mise en service de Ségoukoura par le Président de la République",
        body: [
          "Le 6 février 2026, le Président de la République, M. Bassirou Diomaye Diakhar Faye, s'est rendu à Ségoukoura, dans le département de Tambacounda, pour mettre en service l'électricité produite par la mini-centrale solaire du village, en présence des équipes de l'ASER et de Global Engineering.",
          "D'une puissance de 63,94 kWc, l'installation alimente près de 2 000 habitants ainsi que les infrastructures sociales du village. Le programme ASER–BID dont elle relève prévoit 133 mini-centrales solaires réparties dans 10 régions, dont 31 dans la région de Tambacounda, plus de 259 km de réseau basse tension et les installations intérieures de plus de 6 200 ménages.",
        ],
      },
    ],
    images: [
      { src: "/images/site/segoukoura-1.jpg", alt: "Le Président Bassirou Diomaye Faye sur le site de la mini-centrale solaire de Ségoukoura avec les équipes de l'ASER et de Global Engineering" },
      { src: "/images/site/segoukoura-6.jpg", alt: "Vue aérienne des deux champs de modules photovoltaïques et du local technique de la mini-centrale de Ségoukoura" },
      { src: "/images/site/segoukoura-3.jpg", alt: "Présentation du parc de batteries du local technique au Président de la République" },
      { src: "/images/site/segoukoura-5.jpg", alt: "Explication technique au Chef de l'État devant le local technique de la mini-centrale solaire" },
      { src: "/images/site/segoukoura-2.jpg", alt: "Visite officielle du site de Ségoukoura lors de la mise en service de l'électricité" },
      { src: "/images/site/segoukoura-4.jpg", alt: "Équipes ASER et Global Engineering présentant les onduleurs et le parc de batteries" },
      { src: "/images/site/villages-2.jpg", alt: "Champ de modules photovoltaïques d'une mini-centrale solaire de village" },
      { src: "/images/site/villages-1.jpg", alt: "Mini-centrale solaire au sol installée par GLE" },
      { src: "/images/site/villages-7.jpg", alt: "Équipe GLE posant les modules solaires sur les structures" },
      { src: "/images/site/villages-4.jpg", alt: "Parc de batteries et onduleurs dans le local technique" },
      { src: "/images/site/villages-3.jpg", alt: "Onduleurs solaires installés en local technique" },
      { src: "/images/site/villages-5.jpg", alt: "Technicien posant un chemin de câble sur le site solaire" },
      { src: "/images/site/villages-8.jpg", alt: "Structures métalliques de support des panneaux solaires" },
      { src: "/images/site/villages-9.jpg", alt: "Équipe GLE au travail sur un site de mini-centrale solaire" },
      { src: "/images/site/villages-10.jpg", alt: "Rangée de modules photovoltaïques installés à l'entrée d'un village" },
      { src: "/images/site/villages-6.jpg", alt: "Local technique équipé d'onduleurs et du parc de batteries" },
    ],
  },
  {
    slug: "eclairage-public-bourguiba-front-de-terre",
    title:
      "Projet d'éclairage public OA 14 — Bourguiba / Front de Terre",
    shortTitle: "Éclairage public Bourguiba – Front de Terre",
    category: "Éclairage public",
    location: "Dakar, échangeur Bourguiba – Front de Terre",
    summary:
      "Éclairage complet de l'ouvrage d'art 14 : candélabres, projecteurs LED, coffrets de raccordement et réseau souterrain dédié.",
    specs: [
      { label: "Candélabres", value: "89 × 7 m / 78 W" },
      { label: "Projecteurs LED", value: "84 × 35,2 W" },
      { label: "Coffrets de raccordement", value: "2" },
      { label: "Fourreautage", value: "3 808 m linéaires" },
      { label: "Câble 4 × 6 mm²", value: "3 097 m" },
      { label: "Câble 4 × 4 mm²", value: "711 m" },
      { label: "Piquets de terre", value: "53" },
    ],
    sections: [
      {
        heading: "Un ouvrage d'art éclairé de bout en bout",
        body: [
          "L'ouvrage d'art 14, sur l'axe Bourguiba – Front de Terre, a été équipé d'un éclairage public complet : 89 candélabres de 7 mètres en 78 W et 84 projecteurs LED de 35,2 W répartis sur l'ouvrage et ses rampes.",
          "Le réseau électrique est intégralement enterré : 3 808 mètres linéaires de fourreautage accueillent 3 097 mètres de câble 4 × 6 mm² et 711 mètres de câble 4 × 4 mm², alimentés depuis deux coffrets de raccordement. La sécurité des personnes est assurée par 53 piquets de terre.",
        ],
      },
    ],
    images: [
      { src: "/images/site/bourguiba-1.jpg", alt: "Voie de l'ouvrage d'art 14 équipée en éclairage public" },
      { src: "/images/site/bourguiba-3.jpg", alt: "Équipe GLE en tenue de sécurité sur le chantier de l'OA 14" },
      { src: "/images/site/bourguiba-2.jpg", alt: "Agents GLE au travail sur le projet d'éclairage public Bourguiba" },
      { src: "/images/site/bourguiba-4.jpg", alt: "Équipe GLE en équipement de protection sur le chantier de l'OA 14" },
      { src: "/images/site/bourguiba-5.jpg", alt: "Agents GLE inspectant la voie de l'ouvrage d'art avant la pose des candélabres" },
      { src: "/images/site/bourguiba-6.jpg", alt: "Nacelle sous le tablier de l'ouvrage pour l'installation des projecteurs LED" },
      { src: "/images/site/bourguiba-7.jpg", alt: "Tranchée de fourreautage et tirage de câble sur l'axe Front de Terre" },
    ],
    video: {
      src: "/videos/eclairage-bourguiba.mp4",
      poster: "/images/posters/eclairage-bourguiba.jpg",
      captions: "/videos/eclairage-bourguiba.vtt",
    },
  },
  {
    slug: "eclairage-autopont-diouloulou",
    title: "Éclairage urbain de l'autopont de Diouloulou",
    shortTitle: "Autopont de Diouloulou",
    category: "Éclairage public",
    location: "Diouloulou, région de Ziguinchor",
    summary:
      "Éclairage de l'autopont de Diouloulou : 22 candélabres, coffret de raccordement au poste de Diouloulou et modules LED TFlex en configuration normale et secours.",
    specs: [
      { label: "Candélabres", value: "22 × 7 m / 78 W" },
      { label: "Raccordement", value: "Coffret au poste de Diouloulou" },
      { label: "Modules", value: "TFlex Base, Type 4, Combi 2 et 3" },
    ],
    sections: [
      {
        heading: "Une installation dimensionnée pour la continuité de service",
        body: [
          "L'éclairage de l'autopont repose sur 22 candélabres de 7 mètres équipés en 78 W, alimentés par un coffret de raccordement établi au poste de Diouloulou.",
          "L'installation combine plusieurs configurations de modules LED afin d'assurer à la fois l'éclairage normal et un éclairage de secours en cas de défaut d'alimentation.",
        ],
        bullets: [
          "TFlex Base secours — 60 LEDs / 700 mA",
          "TFlex Base normale",
          "TFlex Base Type 4",
          "TFlex Combi 3 — 240 LEDs",
          "TFlex Combi 2 — 160 LEDs",
        ],
      },
    ],
    images: [
      { src: "/images/site/diouloulou-2.jpg", alt: "Massif béton et platine d'un candélabre de l'autopont de Diouloulou" },
      { src: "/images/site/diouloulou-4.jpg", alt: "Raccordement du câble dans le massif d'un candélabre" },
      { src: "/images/site/diouloulou-1.jpg", alt: "Fouille et puits de terre sur le chantier de Diouloulou" },
      { src: "/images/site/diouloulou-3.jpg", alt: "Tranchée de passage des câbles d'éclairage public à Diouloulou" },
    ],
    video: {
      src: "/videos/eclairage-diouloulou.mp4",
      poster: "/images/posters/eclairage-diouloulou.jpg",
      captions: "/videos/eclairage-diouloulou.vtt",
    },
  },
  {
    slug: "tunnel-soumbedioune",
    title: "Système d'éclairage du tunnel de Soumbédioune",
    shortTitle: "Tunnel de Soumbédioune",
    category: "Éclairage public",
    location: "Corniche Ouest, Dakar",
    summary:
      "Éclairage du tunnel de Soumbédioune, piloté par une armoire TGBT et une horloge astronomique, avec modules LED TFlex en régime normal et secours.",
    specs: [
      { label: "Commande", value: "Armoire TGBT + horloge astronomique" },
      { label: "Modules", value: "TFlex Base, Type 4, Combi 2 et 3" },
      { label: "Ouvrage", value: "Tunnel routier urbain" },
    ],
    sections: [
      {
        heading: "Un éclairage permanent, commandé automatiquement",
        body: [
          "Le tunnel de Soumbédioune, sur la Corniche, exige un éclairage disponible en continu. L'installation est pilotée depuis une armoire TGBT associée à une horloge astronomique qui adapte automatiquement les régimes d'éclairage au cycle jour/nuit.",
          "Les modules LED retenus sont de la même famille TFlex que sur l'autopont de Diouloulou, avec des configurations normale et secours pour garantir la sécurité des usagers en cas de défaut.",
        ],
      },
    ],
    images: [
      { src: "/images/site/soumbedioune-1.jpg", alt: "Tunnel de Soumbédioune éclairé, véhicule en circulation" },
      { src: "/images/site/soumbedioune-2.jpg", alt: "Techniciens GLE dans le tunnel de Soumbédioune éclairé" },
      { src: "/images/site/soumbedioune-3.jpg", alt: "Installation des luminaires sur échafaudage dans le tunnel" },
      { src: "/images/site/soumbedioune-4.jpg", alt: "Techniciens GLE câblant l'armoire TGBT de commande de l'éclairage" },
    ],
  },
  {
    slug: "projet-camberene",
    title: "Éclairage public du pont croisement Cambérène",
    shortTitle: "Projet Cambérène",
    category: "Éclairage public",
    location: "Cambérène, Dakar",
    summary:
      "Éclairage public du pont et des abords du croisement Cambérène, à Dakar : mâts, luminaires LED et aménagement lumineux des espaces piétons.",
    specs: [
      { label: "Ouvrage", value: "Pont du croisement Cambérène" },
      { label: "Périmètre", value: "Chaussées, rampes et abords piétons" },
      { label: "Ville", value: "Dakar" },
    ],
    sections: [
      {
        heading: "Éclairer l'ouvrage et l'espace public autour",
        body: [
          "Le projet couvre l'éclairage public du pont au croisement Cambérène ainsi que ses abords : chaussées, rampes d'accès et espaces piétons aménagés sous et autour de l'ouvrage.",
          "Les luminaires ont été implantés pour sécuriser à la fois la circulation routière et les cheminements piétons, très fréquentés sur ce carrefour de Dakar.",
        ],
      },
    ],
    images: [
      { src: "/images/site/camberene-5.jpg", alt: "Ouvrage de Cambérène avec éclairage public et espaces plantés" },
      { src: "/images/site/camberene-3.jpg", alt: "Agents GLE près des candélabres installés à Cambérène" },
      { src: "/images/site/camberene-1.jpg", alt: "Espace piéton éclairé sous l'ouvrage de Cambérène" },
      { src: "/images/site/camberene-2.jpg", alt: "Éclairage sous le tablier du pont de Cambérène" },
      { src: "/images/site/camberene-4.jpg", alt: "Vue de la voie et des candélabres du croisement Cambérène" },
      { src: "/images/site/camberene-6.jpg", alt: "Détail d'un module LED d'éclairage installé à Cambérène" },
      { src: "/images/site/camberene-7.jpg", alt: "Candélabres de l'ouvrage de Cambérène" },
    ],
  },
  {
    slug: "projet-castor",
    title:
      "Extension BT et feux tricolores du carrefour Cheikh Ahmadou Bamba",
    shortTitle: "Projet Castor",
    category: "Signalisation routière",
    location: "Carrefour Cheikh Ahmadou Bamba (Castor), Dakar",
    summary:
      "Extension de réseau basse tension aérienne et mise en place de la signalisation lumineuse tricolore du carrefour Castor.",
    specs: [
      { label: "Réseau", value: "Extension BT aérienne" },
      { label: "Signalisation", value: "Feux tricolores R12, R14d, R14tg, R11V" },
      { label: "Site", value: "Carrefour Cheikh Ahmadou Bamba" },
    ],
    sections: [
      {
        heading: "Alimenter puis réguler le carrefour",
        body: [
          "Le projet a d'abord porté sur une extension de réseau basse tension aérienne permettant d'alimenter les équipements du carrefour Cheikh Ahmadou Bamba, à Castor.",
          "La signalisation lumineuse a ensuite été déployée avec quatre types de feux couvrant l'ensemble des mouvements du carrefour.",
        ],
        bullets: [
          "R12 — feux piétons",
          "R14d — flèche tout droit",
          "R14tg — flèche tourner à gauche",
          "R11V — feu tricolore rond",
        ],
      },
    ],
    images: [
      { src: "/images/site/castor-1.jpg", alt: "Carrefour Castor équipé de feux tricolores installés par GLE" },
      { src: "/images/site/castor-2.jpg", alt: "Feu tricolore du carrefour Castor en gros plan" },
      { src: "/images/site/castor-3.jpg", alt: "Signalisation lumineuse installée au carrefour Cheikh Ahmadou Bamba" },
      { src: "/images/site/castor-4.jpg", alt: "Circulation régulée par les feux tricolores du carrefour Castor" },
      { src: "/images/site/castor-5.jpg", alt: "Vue de l'ouvrage et du carrefour équipé par GLE" },
    ],
  },
  {
    slug: "projet-desfers-solaire",
    title:
      "DESFERS — Développement économique et social des femmes par les énergies renouvelables solaires au Sahel",
    shortTitle: "Projet DESFERS",
    category: "Solaire photovoltaïque",
    client: "Plan International",
    location: "Régions de Kaolack et Casamance",
    summary:
      "Programme d'équipements solaires productifs au service de l'autonomisation économique des femmes : pico-PV, micro-réseaux, frigos et moulins solaires.",
    specs: [
      { label: "Partenaire", value: "Plan International" },
      { label: "Budget du programme", value: "≈ 3 M€ (80 % de subventions)" },
      { label: "Zones", value: "Kaolack, Casamance" },
      { label: "Technologies", value: "Pico-PV, micro-réseaux SMG, usages productifs" },
    ],
    sections: [
      {
        heading: "L'énergie solaire comme levier économique",
        body: [
          "Le projet DESFERS — Développement économique et social des femmes par les énergies renouvelables solaires au Sahel — est porté avec Plan International dans les régions de Kaolack et de Casamance.",
          "Son budget d'environ 3 millions d'euros, financé à 80 % par des subventions, permet de déployer des solutions solaires calibrées selon les usages : systèmes pico-PV pour les besoins domestiques, micro-réseaux solaires (SMG) pour les grappes d'activités, et équipements productifs — frigos et moulins solaires — directement exploités par les groupements de femmes.",
        ],
        bullets: [
          "Systèmes pico-PV individuels",
          "Micro-réseaux solaires (SMG)",
          "Frigos solaires pour la conservation",
          "Moulins solaires pour la transformation",
        ],
      },
    ],
    images: [
      { src: "/images/site/villages-1.jpg", alt: "Installation solaire photovoltaïque au sol réalisée par GLE" },
      { src: "/images/site/villages-3.jpg", alt: "Onduleurs solaires en local technique" },
      { src: "/images/site/villages-9.jpg", alt: "Équipe GLE sur un site d'équipement solaire" },
      { src: "/images/site/villages-10.jpg", alt: "Modules photovoltaïques alimentant les équipements productifs d'un village" },
      { src: "/images/site/villages-7.jpg", alt: "Pose des modules solaires par les équipes GLE" },
    ],
  },
];

/* ---------------------------------------------------------------------- blog */

export type Post = {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  category: string;
  readingTime: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  sections: { heading?: string; body?: string[]; bullets?: string[] }[];
  /** Galerie optionnelle affichée en fin d'article. */
  gallery?: { src: string; alt: string }[];
  galleryTitle?: string;
};

export const posts: Post[] = [
  {
    slug: "global-engineering-mauritanie-succursale-nouakchott",
    title:
      "Global Engineering ouvre sa succursale en Mauritanie, à Nouakchott",
    date: "2026-09-13",
    dateLabel: "13 septembre 2026",
    category: "Vie de l'entreprise",
    readingTime: "3 min",
    excerpt:
      "Global Engineering Mauritanie s'installe à Tevragh Zeina, à Nouakchott. La succursale porte les mêmes métiers qu'à Dakar : solaire photovoltaïque, réseaux MT/BT, éclairage public, fournitures et études techniques.",
    image: "/images/site/villages-5.jpg",
    imageAlt:
      "Installation solaire réalisée par les équipes de Global Engineering",
    sections: [
      {
        body: [
          "Global Engineering SARL franchit une nouvelle étape et s'implante hors du Sénégal : la société annonce l'ouverture de Global Engineering Mauritanie, sa succursale installée au N° 70 — NOT EXT MD F, dans le quartier de Tevragh Zeina, à Nouakchott.",
          "Après dix années d'intervention sur le territoire sénégalais — électrification rurale pour l'ASER, mini-centrales solaires de 133 villages, éclairage public à Dakar et en Casamance — cette implantation répond à une demande croissante d'opérateurs et de bailleurs qui conduisent des programmes d'accès à l'énergie à l'échelle sous-régionale.",
        ],
      },
      {
        heading: "Les mêmes métiers, la même exigence technique",
        body: [
          "La succursale mauritanienne porte l'intégralité des activités du groupe, avec les mêmes méthodes et les mêmes standards de sécurité que les chantiers menés depuis Dakar :",
        ],
        bullets: [
          "Solaire photovoltaïque : centrales, mini-réseaux, pompage et installations autonomes",
          "Électricité et réseaux moyenne et basse tension : construction, extension, réhabilitation et raccordements",
          "Éclairage public : mâts, candélabres solaires, éclairage d'ouvrages et de voiries",
          "Fournitures solaires et équipements électriques",
          "Études techniques : dimensionnement, notes de calcul et assistance au montage de dossiers",
        ],
      },
      {
        heading: "Une base avancée pour les projets régionaux",
        body: [
          "Disposer d'une structure locale change la conduite des projets : les équipes et le matériel sont mobilisables sans délai de passage de frontière, les approvisionnements sont sourcés au plus près du chantier, et le suivi des maîtres d'ouvrage mauritaniens se fait en direct depuis Nouakchott.",
          "La succursale sert également de base avancée pour les appels d'offres régionaux, en s'appuyant sur les références et les capacités d'exécution du siège de Dakar.",
        ],
      },
      {
        heading: "Nous contacter à Nouakchott",
        body: [
          "Global Engineering Mauritanie — N° 70 — NOT EXT MD F, Tevragh Zeina, Nouakchott. Téléphone : +222 30 56 36 58.",
          "Pour une demande de devis, une consultation sur appel d'offres ou une proposition de fourniture, le formulaire de contact du site achemine directement votre demande à l'équipe concernée, à Dakar comme à Nouakchott.",
        ],
      },
    ],
    galleryTitle:
      "Les savoir-faire déployés depuis Nouakchott, illustrés par nos chantiers au Sénégal",
    gallery: [
      { src: "/images/site/villages-10.jpg", alt: "Mini-centrale solaire photovoltaïque installée par GLE au Sénégal" },
      { src: "/images/site/rural-10.jpg", alt: "Tête de poteau moyenne tension équipée lors d'un chantier d'électrification rurale" },
      { src: "/images/site/rural-11.jpg", alt: "Onduleurs et coffret de protection montés dans un local technique" },
      { src: "/images/site/bourguiba-6.jpg", alt: "Pose de projecteurs LED sur un ouvrage d'art à Dakar" },
      { src: "/images/site/equipe-4.jpg", alt: "Agents GLE en uniforme lors d'une formation interne" },
      { src: "/images/site/equipe-6.jpg", alt: "Photo de groupe des équipes GLE lors du séminaire annuel" },
    ],
  },
  {
    slug: "mise-en-service-segoukoura-president-bassirou-diomaye-faye",
    title:
      "Mise en service de l'électricité à Ségoukoura par le Président Bassirou Diomaye Diakhar Faye",
    date: "2026-02-06",
    dateLabel: "6 février 2026",
    category: "Vie de l'entreprise",
    readingTime: "4 min",
    excerpt:
      "Le 6 février 2026, le Chef de l'État a mis en service la mini-centrale solaire de Ségoukoura, dans le département de Tambacounda. Une étape du programme ASER–BID de 133 mini-centrales solaires sur lequel Global Engineering intervient.",
    image: "/images/site/segoukoura-1.jpg",
    imageAlt:
      "Le Président Bassirou Diomaye Faye sur le site de la mini-centrale solaire de Ségoukoura, entouré des équipes de l'ASER et de Global Engineering",
    sections: [
      {
        body: [
          "Le vendredi 6 février 2026, le Président de la République, M. Bassirou Diomaye Diakhar Faye, s'est rendu à Ségoukoura, dans le département de Tambacounda, pour y mettre en service l'électricité produite par la mini-centrale solaire du village. Les équipes de l'Agence Sénégalaise d'Électrification Rurale (ASER) et de Global Engineering étaient présentes sur le site pour présenter l'installation au Chef de l'État.",
          "Village jusqu'alors non desservi par le réseau, Ségoukoura dispose désormais d'une production solaire locale et d'un réseau basse tension qui alimente les concessions et les infrastructures sociales de la localité.",
        ],
      },
      {
        heading: "Une mini-centrale de 63,94 kWc pour près de 2 000 habitants",
        body: [
          "La centrale de Ségoukoura affiche une puissance installée de 63,94 kWc. Elle se compose de deux champs de modules photovoltaïques posés au sol, d'un local technique abritant les onduleurs et le parc de batteries, et d'un groupe de secours, l'ensemble étant clôturé et raccordé à un réseau de distribution basse tension desservant le village.",
          "L'installation alimente près de 2 000 habitants : éclairage des ménages, activités économiques, poste de santé et établissements scolaires bénéficient d'une alimentation continue, sans dépendance au gasoil.",
        ],
        bullets: [
          "Puissance installée : 63,94 kWc",
          "Population desservie : environ 2 000 habitants",
          "Production solaire avec stockage sur parc de batteries",
          "Réseau basse tension de distribution et installations intérieures",
        ],
      },
      {
        heading: "Le programme ASER–BID : 133 mini-centrales dans 10 régions",
        body: [
          "Ségoukoura s'inscrit dans le programme d'électrification rurale conduit par l'ASER avec le concours de la Banque Islamique de Développement, d'un montant global de 17,6 milliards de francs CFA — 13,1 milliards apportés par la BID, 2,24 milliards par le Fonds de solidarité islamique pour le développement et 2,27 milliards par l'État du Sénégal.",
          "Le programme porte sur 133 mini-centrales solaires réparties dans 10 régions du pays, dont 31 pour la seule région de Tambacounda, plus de 259 kilomètres de réseau basse tension et les installations intérieures de plus de 6 200 ménages.",
        ],
      },
      {
        heading: "La part de Global Engineering",
        body: [
          "Global Engineering intervient sur la construction de ces mini-centrales de village : préparation des plateformes, pose des structures porteuses et des modules photovoltaïques, chemins de câble, puits de terre et mises à la terre, équipement des locaux techniques en onduleurs et batteries, puis essais avant mise sous tension.",
          "Chaque site suit la même chaîne d'exécution et les mêmes contrôles de sécurité électrique, de la fouille jusqu'au raccordement du réseau du village — la méthode appliquée sur l'ensemble du marché des 133 villages.",
        ],
      },
    ],
    galleryTitle: "La visite présidentielle sur le site de Ségoukoura",
    gallery: [
      { src: "/images/site/segoukoura-1.jpg", alt: "Le Président de la République accueilli sur le site de la mini-centrale solaire de Ségoukoura" },
      { src: "/images/site/segoukoura-6.jpg", alt: "Vue aérienne des champs de modules photovoltaïques et du local technique de Ségoukoura" },
      { src: "/images/site/segoukoura-5.jpg", alt: "Présentation technique de l'installation au Chef de l'État devant le local technique" },
      { src: "/images/site/segoukoura-3.jpg", alt: "Parc de batteries du local technique de la mini-centrale de Ségoukoura" },
      { src: "/images/site/segoukoura-2.jpg", alt: "Délégation officielle en visite sur le site de la mini-centrale solaire" },
      { src: "/images/site/segoukoura-4.jpg", alt: "Équipes ASER et Global Engineering présentant les onduleurs de la centrale" },
    ],
  },
  {
    slug: "energies-renouvelables",
    title: "Les énergies renouvelables : définitions, types et impacts",
    date: "2025-05-16",
    dateLabel: "16 mai 2025",
    category: "Énergies renouvelables",
    readingTime: "5 min",
    excerpt:
      "Les énergies renouvelables représentent aujourd'hui une solution essentielle pour répondre aux défis climatiques, économiques et énergétiques mondiaux.",
    image: "/images/site/villages-2.jpg",
    imageAlt: "Champ de panneaux solaires photovoltaïques",
    sections: [
      {
        body: [
          "Les énergies renouvelables représentent aujourd'hui une solution essentielle pour répondre aux défis climatiques, économiques et énergétiques mondiaux.",
        ],
      },
      {
        heading: "1. Qu'est-ce que l'énergie renouvelable ?",
        body: [
          "L'énergie renouvelable désigne une source d'énergie issue de phénomènes naturels inépuisables ou qui se renouvellent rapidement à l'échelle humaine. Ces sources incluent notamment le soleil, le vent, l'eau, ainsi que la matière organique. Contrairement aux énergies fossiles, elles sont propres, durables et respectueuses de l'environnement.",
        ],
      },
      {
        heading: "2. Les différents types d'énergies renouvelables",
        body: [
          "Il existe plusieurs formes d'énergies renouvelables, chacune ayant des caractéristiques et des applications spécifiques :",
        ],
        bullets: [
          "L'énergie solaire : produite grâce à la lumière (panneaux photovoltaïques) ou à la chaleur du soleil (panneaux thermiques).",
          "L'énergie éolienne : générée par la force du vent, captée par des éoliennes terrestres ou en mer.",
          "L'énergie hydraulique : exploitée à partir du mouvement de l'eau (barrages, marées, courants).",
          "La biomasse : obtenue par la combustion ou la transformation de matières organiques (bois, déchets végétaux ou animaux).",
          "La géothermie : repose sur la chaleur naturellement présente sous la surface de la Terre.",
        ],
      },
      {
        heading: "3. Pourquoi favoriser les énergies renouvelables ?",
        body: ["Adopter les énergies renouvelables, c'est répondre à plusieurs enjeux majeurs :"],
        bullets: [
          "Réduire la dépendance aux énergies fossiles, dont les réserves sont limitées.",
          "Lutter contre le changement climatique en limitant les émissions de CO₂.",
          "Encourager la transition énergétique vers un modèle plus propre et durable.",
          "Garantir un accès à l'énergie dans des zones encore non desservies.",
        ],
      },
      {
        heading: "4. Quel est l'impact des énergies renouvelables dans notre société ?",
        body: [
          "Les énergies renouvelables ont un impact positif multiple, tant sur le plan environnemental que socio-économique.",
          "Sur le plan environnemental, elles réduisent la pollution de l'air, limitent les gaz à effet de serre et contribuent à la préservation des écosystèmes. Sur le plan économique, les filières renouvelables génèrent des milliers d'emplois locaux, stimulent l'innovation et favorisent le développement d'une économie verte.",
          "Sur le plan social, elles améliorent l'accès à l'électricité, notamment dans les zones rurales ou isolées, et participent à une meilleure qualité de vie. Sur le plan stratégique enfin, en développant leurs propres ressources renouvelables, les pays renforcent leur souveraineté énergétique et réduisent leur dépendance aux importations.",
        ],
      },
      {
        heading: "Conclusion",
        body: [
          "L'intégration des énergies renouvelables dans notre société n'est plus une option, mais une nécessité. Leur adoption massive constitue une réponse durable aux défis environnementaux, économiques et sociaux actuels. Miser sur les énergies renouvelables, c'est investir dans un avenir propre, autonome et résilient.",
        ],
      },
    ],
  },
  {
    slug: "electrification-et-reseaux-electriques-afrique",
    title: "L'électrification rurale et les réseaux électriques en Afrique",
    date: "2025-05-16",
    dateLabel: "16 mai 2025",
    category: "Réseaux électriques",
    readingTime: "8 min",
    excerpt:
      "Défis de l'électrification rurale, maintenance des réseaux et rôle des renouvelables : trois dimensions d'une électrification plus équitable et résiliente.",
    image: "/images/site/rural-2.jpg",
    imageAlt: "Réseau électrique rural le long d'une route au Sénégal",
    sections: [
      {
        body: [
          "L'électrification joue un rôle crucial dans le développement économique et social, en particulier en Afrique, où l'accès à l'électricité reste un défi majeur, notamment en milieu rural. Pour assurer une distribution fiable et continue de l'énergie, les pays doivent investir non seulement dans l'extension des réseaux électriques, mais aussi dans leur maintenance et leur optimisation.",
          "Dans cet article, nous explorons trois dimensions essentielles de ce sujet : les défis de l'électrification rurale en Afrique, l'importance de la maintenance et de la performance des réseaux électriques, et le rôle des énergies renouvelables dans le renforcement des infrastructures électriques.",
        ],
      },
      {
        heading: "1. Les défis de l'électrification rurale en Afrique",
        body: [
          "L'électrification rurale reste l'un des plus grands défis énergétiques sur le continent africain. Malgré les efforts engagés par de nombreux pays, plus de 500 millions de personnes vivent encore sans accès à une source d'électricité fiable, principalement dans les zones rurales et isolées.",
          "Dans plusieurs régions rurales, les réseaux électriques nationaux n'atteignent pas les villages éloignés. Le coût élevé de l'extension des lignes, combiné à des obstacles géographiques, rend cette électrification classique peu rentable pour les États et les compagnies.",
          "Le manque d'investissements durables constitue un autre frein majeur : construction de mini-centrales ou de micro-réseaux, achat et installation de panneaux solaires ou de batteries, formation et entretien des infrastructures. Or, les zones rurales sont souvent perçues comme peu rentables à court terme, ce qui décourage les investisseurs privés.",
          "Pour contourner ces difficultés, de plus en plus d'acteurs misent sur les solutions hors-réseau (off-grid) : systèmes solaires individuels, kits solaires domestiques, mini-grids hybrides. Ces technologies offrent une installation rapide et flexible, un coût adapté aux réalités locales et une réduction des pertes liées à la transmission longue distance.",
          "L'électrification durable passe aussi par l'implication des communautés locales. La formation de techniciens ruraux, la sensibilisation des usagers à l'efficacité énergétique et le soutien aux initiatives locales sont des leviers essentiels pour assurer la pérennité des projets.",
        ],
      },
      {
        heading: "2. Maintenance et optimisation des réseaux électriques",
        body: [
          "Un réseau électrique performant ne repose pas uniquement sur son extension, mais aussi sur sa capacité à fonctionner de manière continue, stable et sécurisée. En Afrique, de nombreux pays doivent faire face à des réseaux vieillissants, mal entretenus ou surchargés, ce qui entraîne des coupures fréquentes et des pertes importantes.",
          "La maintenance préventive est essentielle pour éviter les pannes et prolonger la durée de vie des équipements. Or, dans beaucoup de régions, elle est insuffisante en raison du manque de personnel qualifié, de l'absence de suivi régulier, de la pénurie de pièces de rechange et de budgets opérationnels limités.",
          "L'inefficacité des réseaux se manifeste aussi par des pertes d'énergie lors du transport et de la distribution — jusqu'à 20 % à 30 % dans certains pays — dues à des câbles surchargés ou obsolètes, à des connexions non sécurisées et aux branchements frauduleux.",
        ],
        bullets: [
          "L'introduction de technologies intelligentes (smart grids)",
          "La télésurveillance et la détection automatique des pannes",
          "L'intégration de capteurs et d'outils numériques pour ajuster la production à la demande",
        ],
      },
      {
        heading: "3. Les énergies renouvelables au service des infrastructures électriques",
        body: [
          "Face aux défis d'électrification et à la pression sur les réseaux traditionnels, les énergies renouvelables jouent un rôle stratégique dans la modernisation et la résilience des infrastructures électriques. Leur intégration permet de produire une électricité plus propre, de désenclaver les zones isolées et de renforcer la fiabilité globale du système énergétique.",
          "En Afrique, l'abondance de ressources naturelles comme le soleil, le vent ou la biomasse représente une opportunité unique : ces énergies sont disponibles localement, peu coûteuses à long terme et faciles à déployer en dehors des réseaux classiques.",
          "Les énergies renouvelables favorisent aussi un modèle plus décentralisé, basé sur des micro-grids autonomes, une production locale maîtrisée et une implication directe des communautés dans la gestion de l'énergie. Cette approche renforce la résilience des infrastructures face aux aléas climatiques et aux difficultés d'approvisionnement.",
        ],
      },
      {
        heading: "Conclusion",
        body: [
          "L'avenir de l'électrification en Afrique repose sur une approche intégrée et durable. En misant sur une maintenance efficace des réseaux électriques et en intégrant les énergies renouvelables dans les infrastructures, les États, les entreprises et les communautés peuvent bâtir un modèle énergétique plus résilient face aux crises, plus équitable pour les populations rurales et plus durable pour l'environnement.",
          "La transition énergétique n'est pas seulement une nécessité écologique, c'est aussi une opportunité de développement économique et social, capable de transformer en profondeur les territoires.",
        ],
      },
    ],
  },
  {
    slug: "les-innovations-energetiques-qui-faconnent-le-monde-de-demain",
    title: "Les innovations énergétiques qui façonnent le monde de demain",
    date: "2025-02-28",
    dateLabel: "28 février 2025",
    category: "Innovation",
    readingTime: "7 min",
    excerpt:
      "Panneaux nouvelle génération, smart grids, IA, stockage, microgrids et hydrogène vert : les avancées qui redessinent le secteur de l'énergie.",
    image: "/images/site/blog-innovations.jpg",
    imageAlt: "Équipe GLE lors d'une opération d'électrification de nuit",
    sections: [
      {
        body: [
          "Le secteur de l'énergie est en pleine mutation, porté par la transition énergétique et la recherche de solutions durables pour réduire l'empreinte carbone. Les innovations en énergies renouvelables jouent un rôle essentiel dans l'évolution des sources d'énergie, du stockage à la distribution en passant par la consommation intelligente.",
        ],
      },
      {
        heading: "1. Nouvelles technologies solaires et réseaux électriques",
        body: [
          "Les énergies renouvelables poursuivent leur croissance, soutenues par des innovations technologiques qui en améliorent l'efficacité et la rentabilité.",
        ],
        bullets: [
          "Panneaux solaires nouvelle génération : l'intégration des pérovskites dans les cellules photovoltaïques augmente leur rendement et réduit les coûts de production.",
          "Éoliennes offshore flottantes : capables de capter des vents plus forts et plus constants en pleine mer.",
          "Exploitation des énergies marines : hydroliennes, houlomotrices et énergie thermique des mers gagnent en maturité technologique.",
        ],
      },
      {
        heading: "2. Réseaux intelligents et intelligence artificielle",
        body: [
          "L'intégration du numérique transforme la manière dont l'énergie est gérée et permet une meilleure adaptation aux fluctuations de la demande.",
        ],
        bullets: [
          "Smart grids : ces réseaux intelligents optimisent la distribution de l'énergie en fonction de la demande et des sources disponibles.",
          "IoT et capteurs connectés : ils permettent une gestion précise de la consommation des foyers et des industries.",
          "Blockchain pour l'énergie : elle facilite les transactions d'énergie entre particuliers et entreprises de manière sécurisée.",
          "IA et maintenance prédictive : des algorithmes détectent les signes avant-coureurs de pannes dans les infrastructures énergétiques.",
        ],
      },
      {
        heading: "3. Stockage et gestion intelligente de l'énergie",
        body: [
          "Le stockage est un enjeu majeur pour pallier l'intermittence des énergies renouvelables. Plusieurs solutions innovantes émergent.",
        ],
        bullets: [
          "Batteries sodium-ion et lithium-soufre : une capacité de stockage améliorée et des coûts réduits.",
          "Stockage par hydrogène vert : produit à partir d'énergies renouvelables, l'hydrogène devient une solution de stockage et de transport.",
          "V2G (Vehicle-to-Grid) : les véhicules électriques peuvent restituer de l'énergie au réseau.",
        ],
      },
      {
        heading: "4. Microgrids et électrification rurale",
        body: [
          "L'accès à l'énergie devient une priorité mondiale, notamment pour les zones isolées.",
        ],
        bullets: [
          "Microgrids autonomes : ces mini-réseaux fonctionnent en autonomie et s'appuient sur les renouvelables pour alimenter des villages entiers.",
          "Systèmes hybrides solaire-diesel : ils assurent une alimentation continue et réduisent la dépendance aux fossiles.",
          "Modèles de financement innovants : le « Pay-As-You-Go » permet d'accéder à l'énergie solaire à moindre coût.",
          "Partenariats public-privé : les gouvernements collaborent avec des entreprises pour accélérer l'électrification rurale.",
        ],
      },
      {
        heading: "Conclusion",
        body: [
          "Le secteur de l'énergie est en pleine révolution grâce à ces innovations qui rendent l'énergie plus propre, plus efficace et plus accessible. L'essor du solaire, couplé à des solutions de stockage avancées et des réseaux intelligents, jouera un rôle central dans la transition énergétique.",
        ],
      },
    ],
  },
  {
    slug: "techniques-pour-reussir-une-extension-de-reseau-basse-tension",
    title: "Techniques pour réussir une extension de réseau basse tension",
    date: "2024-11-07",
    dateLabel: "7 novembre 2024",
    category: "Réseaux électriques",
    readingTime: "5 min",
    excerpt:
      "Planification, choix des matériaux, gestion de projet et tests : les étapes clés d'une extension BT sûre, efficace et durable.",
    image: "/images/site/blog-bt.jpg",
    imageAlt: "Techniciens GLE intervenant sur un réseau basse tension",
    sections: [
      {
        body: [
          "L'extension de réseau basse tension est un projet technique complexe qui nécessite une planification minutieuse et une exécution précise. Cet article explore les techniques essentielles pour réussir une extension de réseau basse tension, en garantissant sécurité, efficacité et durabilité.",
        ],
      },
      {
        heading: "1. Planification et analyse des besoins",
        body: [
          "Une compréhension approfondie de la demande énergétique est cruciale. Il est essentiel d'analyser la consommation actuelle et d'anticiper les évolutions futures, notamment en tenant compte de l'expansion urbaine et de la croissance démographique.",
          "Le choix du tracé et la conception du réseau jouent un rôle clé. Il convient de prendre en compte la topographie, les obstacles naturels et artificiels ainsi que les besoins spécifiques des utilisateurs finaux. Une conception optimisée réduit les pertes d'énergie et améliore la distribution électrique.",
        ],
      },
      {
        heading: "2. Sélection des matériaux et des équipements",
        body: [
          "Pour garantir la durabilité du réseau, il est essentiel de sélectionner des câbles résistants, des isolateurs fiables et des équipements de commutation adaptés aux conditions environnementales et opérationnelles.",
          "L'adoption de systèmes de gestion de réseau intelligents améliore considérablement l'efficacité : surveillance en temps réel, gestion proactive des pannes et distribution d'énergie optimisée.",
        ],
      },
      {
        heading: "3. Gestion de projet et coordination",
        body: [
          "Un projet d'extension de réseau basse tension réussi repose sur une planification détaillée, un calendrier bien défini et une coordination efficace entre toutes les parties prenantes.",
          "Les équipes doivent être formées aux normes de sécurité et aux techniques les plus récentes. La mise en place de protocoles stricts permet de prévenir les accidents et d'assurer une installation conforme aux standards.",
        ],
      },
      {
        heading: "4. Mise en œuvre et tests",
        body: [
          "Le respect des normes de construction et des spécifications techniques est primordial. Une supervision continue garantit une installation conforme aux exigences de performance et de sécurité.",
          "Avant d'activer le réseau, il est impératif de réaliser des tests complets afin de s'assurer qu'il fonctionne correctement. Ces contrôles permettent de détecter et de corriger d'éventuels défauts pour garantir une distribution fiable.",
        ],
      },
      {
        heading: "Conclusion",
        body: [
          "Réussir une extension de réseau basse tension repose sur une combinaison de planification stratégique, de sélection rigoureuse des matériaux, de gestion efficace du projet, d'exécution méthodique et de tests approfondis.",
        ],
      },
    ],
  },
  {
    slug: "energie-solaire-photovoltaique-une-revolution-energetique-durable",
    title: "Énergie solaire photovoltaïque : une révolution énergétique durable",
    date: "2024-11-05",
    dateLabel: "5 novembre 2024",
    category: "Solaire photovoltaïque",
    readingTime: "4 min",
    excerpt:
      "Le solaire photovoltaïque s'impose comme une réponse innovante aux défis énergétiques contemporains, à la fois écologique et économique.",
    image: "/images/site/villages-1.jpg",
    imageAlt: "Centrale solaire photovoltaïque au sol installée par GLE",
    sections: [
      {
        heading: "L'essor du solaire photovoltaïque durable",
        body: [
          "Le solaire photovoltaïque durable s'impose comme une réponse innovante aux défis énergétiques contemporains. Exploitant la lumière du soleil, cette technologie propre et renouvelable constitue une alternative efficace aux combustibles fossiles.",
          "Grâce aux cellules photovoltaïques, principalement composées de silicium, l'énergie solaire est transformée en électricité, un procédé à la fois simple et révolutionnaire.",
        ],
      },
      {
        heading: "Les avantages écologiques et économiques",
        body: [
          "Les bénéfices du solaire photovoltaïque durable ne se limitent pas à son impact environnemental positif : il représente également un choix économique stratégique.",
          "L'évolution technologique a considérablement réduit le coût des panneaux solaires, les rendant accessibles à un plus grand nombre. De plus, cette énergie propre n'émet aucun gaz à effet de serre, contribuant activement à la préservation de l'environnement pour les générations futures.",
        ],
      },
      {
        heading: "Un avenir énergétique autonome",
        body: [
          "L'un des principaux atouts du solaire photovoltaïque réside dans l'autonomie énergétique qu'il procure. Particuliers, entreprises et collectivités peuvent produire leur propre électricité, réduisant ainsi leur dépendance aux réseaux traditionnels.",
          "Cette indépendance s'accompagne souvent d'une réduction significative des factures d'énergie, un avantage financier non négligeable.",
        ],
      },
      {
        heading: "Conclusion",
        body: [
          "Adopter le solaire photovoltaïque durable ne se résume pas à un simple choix écologique : c'est une révolution dans notre manière de produire et de consommer l'énergie. Avec ses avantages environnementaux, économiques et son potentiel d'autonomie énergétique, il s'impose comme une solution incontournable pour un avenir plus vert.",
        ],
      },
    ],
  },
];

/* ----------------------------------------------------------------- à propos */

/* ------------------------------------------------------------------- équipe */

export type TeamMember = {
  name: string;
  role: string;
  photo: string;
};

export const team: TeamMember[] = [
  {
    name: company.director,
    role: company.directorRole,
    photo: "/images/site/team/dg-kebe.jpg",
  },
  {
    name: "Mme Coumba Sy Thiam",
    role: "Assistante de direction — Ressources humaines",
    photo: "/images/site/team/coumba-thiam.jpg",
  },
  {
    name: "M. Abdoulaye Diallo",
    role: "Responsable administratif et financier",
    photo: "/images/site/team/abdoulaye-diallo.jpg",
  },
  {
    name: "M. Seck Mamour",
    role: "Responsable technique",
    photo: "/images/site/team/seck-mamour.jpg",
  },
  {
    name: "M. Bouacar Diallo",
    role: "Chef de projet énergies renouvelables",
    photo: "/images/site/team/bouacar-diallo.jpg",
  },
  {
    name: "M. Massala Ludwig Juvet",
    role: "Responsable QHSE",
    photo: "/images/site/team/massala-juvet.jpg",
  },
  {
    name: "M. Ibrahima Wade",
    role: "Responsable achats et logistique",
    photo: "/images/site/team/ibrahima-wade.jpg",
  },
  {
    name: "M. Talla Niang",
    role: "Assistant juridique et administratif",
    photo: "/images/site/team/talla-niang.jpg",
  },
];

/* -------------------------------------------------------------- médiathèque */

export type MediaVideo = {
  title: string;
  location: string;
  description: string;
  src: string;
  poster: string;
  captions: string;
};

export const mediaVideos: MediaVideo[] = [
  {
    title: "Électrification rurale de la région de Diourbel",
    location: "Région de Diourbel — janvier 2025",
    description:
      "Reportage de chantier sur les travaux d'électrification rurale menés par GLE dans la région de Diourbel.",
    src: "/videos/diourbel-electrification-2025.mp4",
    poster: "/images/posters/diourbel-electrification-2025.jpg",
    captions: "/videos/diourbel-electrification-2025.vtt",
  },
  {
    title: "Éclairage public OA 14 — Bourguiba / Front de Terre",
    location: "Dakar",
    description:
      "L'ouvrage d'art 14 éclairé par les 89 candélabres et 84 projecteurs LED installés par les équipes GLE.",
    src: "/videos/eclairage-bourguiba.mp4",
    poster: "/images/posters/eclairage-bourguiba.jpg",
    captions: "/videos/eclairage-bourguiba.vtt",
  },
  {
    title: "Éclairage de l'autopont de Diouloulou",
    location: "Diouloulou, région de Ziguinchor",
    description:
      "Mise en lumière de l'autopont de Diouloulou après la pose des 22 candélabres et le raccordement du coffret.",
    src: "/videos/eclairage-diouloulou.mp4",
    poster: "/images/posters/eclairage-diouloulou.jpg",
    captions: "/videos/eclairage-diouloulou.vtt",
  },
  {
    title: "Travaux d'électrification rurale",
    location: "Sénégal",
    description:
      "Séquence de chantier sur la construction et la réhabilitation des réseaux électriques en zone rurale.",
    src: "/videos/electrification-rurale.mp4",
    poster: "/images/posters/electrification-rurale.jpg",
    captions: "/videos/electrification-rurale.vtt",
  },
  {
    title: "Tirage de câble souterrain",
    location: "Front de Terre, Dakar",
    description:
      "Opération de tirage de câble dans les fourreaux du réseau souterrain d'éclairage public.",
    src: "/videos/tirage-cable.mp4",
    poster: "/images/posters/tirage-cable.jpg",
    captions: "/videos/tirage-cable.vtt",
  },
];

/** Photos de la vie de l'entreprise : bureaux, séminaires, réunions d'équipe. */
export const companyLifePhotos: { src: string; alt: string }[] = [
  { src: "/images/site/visite-usine-sunlight-grece.jpg", alt: "Visite de Global Engineering pour la réception qualité à l'usine Sunlight en Grèce : accueil aux couleurs de GLE et de Sunlight" },
  { src: "/images/site/equipe-3.jpg", alt: "Réunion des équipes GLE en tenue de chantier" },
  { src: "/images/site/equipe-2.jpg", alt: "Séminaire d'entreprise GLE réunissant les équipes techniques" },
  { src: "/images/site/equipe-4.jpg", alt: "Agents GLE en uniforme lors d'une session de formation interne" },
  { src: "/images/site/equipe-5.jpg", alt: "Équipes GLE rassemblées pour une séance d'information sécurité" },
  { src: "/images/site/equipe-6.jpg", alt: "Photo de groupe des équipes GLE lors du séminaire annuel" },
  { src: "/images/site/equipe-1.jpg", alt: "Assemblée réunissant les équipes GLE et les habitants d'un village" },
];

/** Photos fournies par GLE : installations en Casamance et moyens de terrain. */
export const fieldPhotos = [
  { src: "/images/site/casamance-transformateur.jpg", title: "L'énergie au plus près des villages", caption: "En Casamance, un transformateur haut de poteau relie le réseau moyenne tension aux besoins locaux en basse tension.", group: "Réseaux MT/BT" },
  { src: "/images/site/gle-tenue-terrain.jpg", title: "Les couleurs d'un engagement de terrain", caption: "Une tenue aux couleurs de Global Engineering : derrière chaque installation, des femmes et des hommes mobilisés sur le terrain.", group: "Vie de l'entreprise" },
  { src: "/images/site/casamance-local-electrique.jpg", title: "Au cœur de l'installation électrique", caption: "En Casamance, une vue du local électrique et de ses équipements, avec une présence GLE au plus près des installations.", group: "Réseaux MT/BT" },
  { src: "/images/site/casamance-poste-250kva.jpg", title: "250 kVA pour accompagner les besoins locaux", caption: "Raccordement d'un poste de transformation de 250 kVA à Kolda : les équipes GLE réunies autour d'un maillon essentiel du réseau électrique.", group: "Réseaux MT/BT" },
  { src: "/images/site/gle-camion-grue.jpg", title: "Des moyens à la hauteur des chantiers", caption: "Camion équipé d'une grue : transport et manutention se conjuguent pour acheminer les équipements sur les chantiers.", group: "Vie de l'entreprise" },
  { src: "/images/site/gle-transport-poteaux.jpg", title: "Du dépôt au chantier, la logistique en action", caption: "Transport de poteaux et de câbles électriques : une étape concrète entre l'approvisionnement et la construction des réseaux.", group: "Vie de l'entreprise" },
  { src: "/images/site/gle-pickup-terrain.jpg", title: "La mobilité au service du terrain", caption: "Un véhicule de liaison aux couleurs de GLE pour accompagner les déplacements des équipes entre les sites d'intervention.", group: "Vie de l'entreprise" },
  { src: "/images/site/gle-flotte-pickups.jpg", title: "Des équipes mobiles, des chantiers connectés", caption: "Les pickups de liaison Global Engineering illustrent les moyens de déplacement mobilisés pour le suivi des chantiers.", group: "Vie de l'entreprise" },
];

export const values = [
  {
    title: "Prestation de qualité",
    body: "Nous nous engageons à offrir des prestations de la plus haute qualité possible dans tous les domaines de notre expertise. Cela implique d'adopter des standards élevés, de veiller à la précision, à la fiabilité et à la satisfaction de nos clients. Nous visons à dépasser les attentes en mettant en place des processus rigoureux et en favorisant la formation continue de nos équipes.",
  },
  {
    title: "Intégrité",
    body: "L'intégrité est un principe fondamental chez Global Engineering et pour ses collaborateurs. Cela signifie agir de manière honnête, éthique et responsable dans toutes nos actions. Nous nous engageons à respecter les normes morales et éthiques, à être transparents et à prendre des décisions basées sur des valeurs solides.",
  },
  {
    title: "Innovation et excellence",
    body: "La recherche constante de l'innovation et de l'excellence est un pilier essentiel de notre culture. Nous encourageons la créativité, l'adaptabilité et la recherche de solutions novatrices pour résoudre les défis auxquels nous sommes confrontés. L'excellence est notre objectif constant.",
  },
  {
    title: "Contribuer à l'avancement de la société",
    body: "Nous avons la responsabilité d'utiliser nos compétences et nos ressources pour contribuer à l'avancement et au bien-être de la société : engagement dans des projets communautaires, soutien à des initiatives durables, participation à des programmes d'éducation. Notre mission est de laisser un impact positif sur la société dans laquelle nous évoluons.",
  },
  {
    title: "Durabilité et responsabilité environnementale",
    body: "Nous nous engageons à intégrer la durabilité dans tous nos projets et à adopter des pratiques respectueuses de l'environnement. Nous visons à minimiser notre empreinte écologique, à promouvoir l'utilisation responsable des ressources naturelles et à encourager des solutions qui favorisent la protection de l'écosystème.",
  },
] as const;

export const partners = [
  { name: "ASER", logo: "/images/partners/ASER.png" },
  { name: "Senelec", logo: "/images/partners/Senelec.jpg" },
  { name: "Ageroute", logo: "/images/partners/Ageroute.jpeg" },
  { name: "PUDC", logo: "/images/partners/PUDC.png" },
  { name: "Plan International", logo: "/images/partners/Plan-international.png" },
  { name: "SAR", logo: "/images/partners/Sar.png" },
  { name: "AFEER", logo: "/images/partners/AFEER.png" },
  { name: "ECREEE", logo: "/images/partners/ECREEE.png" },
  { name: "Enda Énergie", logo: "/images/partners/Enda-energie.jpg" },
  { name: "ICS", logo: "/images/partners/ICS.png" },
  { name: "LVIA", logo: "/images/partners/Lvia.jpg" },
  { name: "Matière Sénégal", logo: "/images/partners/Matiere-senegal.jpg" },
  { name: "SEM", logo: "/images/partners/SEM.jpg" },
  { name: "Excellec", logo: "/images/partners/Excellec.jpg" },
  { name: "Axitec", logo: "/images/partners/Axitec.png" },
  { name: "Vivo Energy", logo: "/images/partners/Vivo-Energy.png" },
  { name: "Tecogas", logo: "/images/partners/tecogas.jpg" },
  { name: "Swatten (Chine)", logo: "/images/partners/Swatten.png" },
] as const;

/* ----------------------------------------------------------------- contact */

export const contactSubjects = [
  {
    value: "devis" as const,
    label: "Demander un devis",
    description:
      "Une installation solaire, un raccordement, un projet d'éclairage : décrivez votre besoin, nous revenons avec un chiffrage.",
    icon: "file-text" as const,
  },
  {
    value: "appel-offres" as const,
    label: "Consulter GLE sur un appel d'offres",
    description:
      "Vous êtes maître d'ouvrage ou groupement : transmettez le dossier, notre bureau d'études répond dans les délais de la consultation.",
    icon: "gavel" as const,
  },
  {
    value: "fournisseur" as const,
    label: "Devenir fournisseur ou partenaire",
    description:
      "Matériel électrique, équipements solaires, sous-traitance de travaux : présentez votre offre à notre service achats.",
    icon: "handshake" as const,
  },
];

export type ContactSubject = (typeof contactSubjects)[number]["value"];

export const howHeardOptions = [
  "Réseaux sociaux",
  "Moteur de recherche",
  "Ami ou famille",
  "Appel d'offres",
  "Autre",
] as const;
