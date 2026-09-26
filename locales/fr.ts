/**
 * French copy of the portfolio.
 *
 * This file is the source of truth for the message shape: `Messages` is derived
 * from it, so every other locale must provide exactly the same keys.
 *
 * Conventions:
 * - Strings rendered with `v-html` may contain `<b>…</b>`; inside a `.rich`
 *   container those are styled as highlighted (lighter) text, not bold.
 * - Titles with a gradient word are split into `before` / `highlight` / `after`
 *   so the markup (and its classes) stays in the components.
 */
export const fr = {
  meta: {
    title: 'Pierre Van Elsuve — Développeur Full-Stack',
    description:
      'Pierre Van Elsuve — Étudiant ingénieur ESEO et développeur full-stack. Portfolio, projets et expériences.',
    ogDescription: 'Étudiant ingénieur ESEO, développeur full-stack. Projets, expériences et contact.',
  },

  header: {
    links: [
      { label: 'À propos', href: '#about' },
      { label: 'Compétences', href: '#skills' },
      { label: 'Parcours', href: '#experience' },
      { label: 'Projets', href: '#projects' },
      { label: 'Contact', href: '#contact' },
    ],
    cta: 'Me contacter',
    menu: 'Menu',
    // Label of the switch button = the language it switches TO.
    switchLabel: 'EN',
    switchAria: 'Switch to English',
  },

  hero: {
    availability: 'Disponible — stage à partir de février 2027',
    intro:
      "Étudiant <b>ingénieur à l'ESEO</b>, spécialisé logiciels &amp; données. Je conçois des applications web <b>full-stack</b>, du front soigné jusqu'au back robuste et déployé.",
    primaryCta: 'Découvrir Récurra',
    secondaryCta: 'Voir mes projets',
    stats: [
      { value: '3', label: 'stages en entreprise' },
      { value: '11,5', label: "mois d'expérience" },
      { value: '2027', label: 'recherche de stage' },
    ],
    cardRole: 'Développeur Full-Stack',
  },

  cv: {
    // Hero button: downloads the CV in the current language.
    download: 'Télécharger mon CV',
    // Contact section: both versions, labelled by their language.
    label: 'Mon CV :',
    fr: 'Français',
    en: 'Anglais',
  },

  about: {
    eyebrow: 'À propos',
    // Rendered on two lines: `line1`, then `before` + gradient `highlight` + `after`.
    title: { line1: 'Je transforme des idées', before: 'en produits ', highlight: 'web vivants', after: '.' },
    paragraphs: [
      "Étudiant ingénieur en informatique et électronique à l'<b>ESEO</b>, je me suis spécialisé dans le développement <b>logiciel et la donnée</b>. Au fil de mes stages — chez <b>SYSTRA à Dublin</b>, <b>Thales</b> et <b>Manitou</b> — j'ai appris à livrer des applications web concrètes, en équipe et en méthode Agile.",
      "J'aime autant <b>le détail d'une interface</b> que la <b>solidité d'un back-end</b> bien pensé. Curieux et rigoureux, je recherche un stage à partir de février 2027 pour mettre tout ça en pratique.",
    ],
    facts: [
      { icon: 'cap', label: 'Formation', value: 'Cycle ingénieur ESEO — Logiciels & Données' },
      { icon: 'pin', label: 'Localisation', value: 'France · ouvert à la mobilité' },
      { icon: 'globe', label: 'Langues', value: 'Français · Anglais (B1) · Espagnol (A2)' },
      { icon: 'spark', label: 'Recherche', value: 'Stage — à partir de février 2027' },
    ],
  },

  skills: {
    eyebrow: 'Compétences',
    title: { before: 'Une stack ', highlight: 'full-stack', after: ' complète' },
    subtitle: 'Du pixel à la production : interfaces soignées, APIs robustes et déploiement conteneurisé.',
    groups: [
      {
        title: 'Frontend',
        icon: 'layout',
        items: ['Vue / Nuxt', 'React', 'Tailwind CSS', 'Bootstrap', 'HTML / CSS', 'JavaScript'],
      },
      {
        title: 'Backend',
        icon: 'server',
        items: ['Express.js', 'Spring', 'Node.js', 'API REST', 'SQL', 'Java'],
      },
      {
        title: 'Outils & DevOps',
        icon: 'box',
        items: ['Docker', 'Git', 'CI / CD', 'Linux', 'Postgres'],
      },
      {
        title: 'Tests & Qualité',
        icon: 'check',
        items: ['Jest', 'Playwright', 'TypeScript', 'Méthode Agile'],
      },
    ],
  },

  experience: {
    eyebrow: 'Parcours',
    title: { before: 'Des expériences ', highlight: 'concrètes', after: '' },
    // Most recent first.
    items: [
      {
        role: 'Développeur Full-Stack — Stage',
        company: 'SYSTRA',
        place: 'Dublin, Irlande',
        period: '5 mois',
        tags: ['Web app', 'UI', 'Équipe anglophone'],
        description:
          "Développement d'une application web (interface utilisateur) au sein d'une équipe internationale de 15 personnes. Une expérience précieuse en travail d'équipe et communication en anglais.",
      },
      {
        role: 'Développeur Full-Stack — Stage',
        company: 'Thales',
        place: 'Cholet, France',
        period: '4,5 mois',
        tags: ['Front-end', 'Back-end', 'Agile', 'Défense'],
        description:
          "Développement et maintenance d'applications web, front-end et back-end, avec des technologies modernes dans un environnement Agile, pour le secteur de la défense.",
      },
      {
        role: 'Stage R&D — Bachelor 2ᵉ année',
        company: 'Manitou',
        place: 'Ancenis, France',
        period: '2 mois',
        tags: ['VBS', 'API', 'Données CAO'],
        description: "Au sein du pôle R&D, création d'un script VBS de mise en forme des données CAO via API.",
      },
    ],
    educationTitle: 'Formation',
    education: [
      { title: 'Cycle ingénieur — Logiciels & Données', school: 'ESEO', period: '2025 — présent' },
      { title: 'Bachelor Informatique & Électronique', school: 'ESEO', period: '2022 — 2025' },
    ],
    hobbiesTitle: 'En dehors du code',
    hobbies:
      "Meneur de jeu au basket depuis 10 ans, arbitre et bénévole. Passionné de finance et d'investissement. Discipline de la salle de sport, 6 fois par semaine.",
  },

  projects: {
    eyebrow: 'Projets',
    title: { before: 'Ce que je ', highlight: 'construis', after: '' },
    openApp: "Ouvrir l'application",
    sourceCode: 'Voir le code',
    // `highlights` = what was solved (technical choices, hard parts), not features.
    recurra: {
      badge: 'Projet phare · en ligne',
      description:
        "Application de suivi d'abonnements personnels : synthèse des dépenses, répartition par catégorie et évolution dans le temps. Pensée, développée et déployée de bout en bout.",
      highlights: [
        "Import de relevé bancaire (.xlsx / .csv) : les dépenses récurrentes sont détectées automatiquement (même montant à intervalle mensuel ou annuel). Le fichier est analysé en mémoire, jamais stocké.",
        'Deux comptes isolés : un compte personnel et un compte démo réinitialisé à chaque connexion, pour tester sans rien casser.',
        'Calcul des totaux et détection couverts par des tests Vitest ; déployable en Docker (auto-hébergé) ou sur Vercel + Neon.',
      ],
      alt: {
        main: 'Tableau de bord Récurra : totaux mensuel et annuel, répartition par catégorie et coût par abonnement',
        secondary: 'Liste des abonnements Récurra avec filtres, catégories et prochains paiements',
      },
    },
    revu: {
      badge: 'SaaS · en ligne',
      description:
        "SaaS de collecte d'avis pour les commerces de proximité : le client scanne un QR code et note sa visite en quelques secondes, sans application. Le commerçant suit la moyenne des notes, l'analyse des commentaires et reçoit une alerte quand un problème revient.",
      highlights: [
        "Analyse des commentaires par mots-clés : quand un problème revient (« attente », « froid »…), le commerçant est alerté par email.",
        "Pensé pour le serverless : limitation de débit stockée dans PostgreSQL pour tenir sur toutes les instances, fonctions Vercel dans la même région que la base Neon.",
        'Authentification JWT, mots de passe hachés (bcrypt), réinitialisation par email ; la démo publique est remise à zéro chaque jour par une tâche cron.',
      ],
      alt: {
        main: 'Tableau de bord commerçant Revu : alerte critique, note moyenne, évolution et mots les plus mentionnés',
        secondary: "Page d'avis Revu sur mobile, ouverte après le scan du QR code",
      },
    },
    others: [
      {
        name: 'Gestion de club de basket',
        blurb: "Application web de gestion d'un club : effectifs, plannings et suivi.",
        stack: ['HTML', 'CSS', 'JavaScript'],
      },
      {
        name: 'Jeu de bataille navale',
        blurb: 'Jeu en ligne de commande développé en C, logique de grille et IA simple.',
        stack: ['Langage C'],
      },
      {
        name: 'Jeu du dinosaure',
        blurb: 'Recréation du jeu du T-Rex en Python, gestion des collisions et du score.',
        stack: ['Python'],
      },
      {
        name: 'Éthylomètre & Radar de recul',
        blurb: 'Projets électroniques embarqués : mesure et signalisation temps réel.',
        stack: ['STM32', 'Arduino', 'Analogique'],
      },
    ],
  },

  contact: {
    eyebrow: 'Contact',
    title: { before: 'Construisons quelque chose ', highlight: 'ensemble', after: '' },
    subtitle: "Un stage, un projet ou simplement envie d'échanger ? Ma boîte mail est toujours ouverte.",
    phone: 'Téléphone',
  },

  footer: {
    credits: 'Conçu & développé avec Nuxt.',
    backToTop: 'Haut de page ↑',
  },
}

/** Shape every locale must follow (derived from the French source). */
export type Messages = typeof fr
