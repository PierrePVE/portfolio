import type { Messages } from './fr'

/**
 * English copy of the portfolio (default locale).
 *
 * Typed against the French source so a missing or extra key fails type-checking.
 * See `fr.ts` for the `<b>` / title-split conventions.
 */
export const en: Messages = {
  meta: {
    title: 'Pierre Van Elsuve — Full-Stack Developer',
    description:
      'Pierre Van Elsuve — ESEO engineering student and full-stack developer. Portfolio, projects and experience.',
    ogDescription: 'ESEO engineering student, full-stack developer. Projects, experience and contact.',
  },

  header: {
    links: [
      { label: 'About', href: '#about' },
      { label: 'Skills', href: '#skills' },
      { label: 'Experience', href: '#experience' },
      { label: 'Projects', href: '#projects' },
      { label: 'Contact', href: '#contact' },
    ],
    cta: 'Get in touch',
    menu: 'Menu',
    switchLabel: 'FR',
    switchAria: 'Passer en français',
  },

  hero: {
    availability: 'Available — internship from February 2027',
    intro:
      '<b>Engineering student at ESEO</b>, specialising in software &amp; data. I build <b>full-stack</b> web applications, from polished front-ends to robust, deployed back-ends.',
    primaryCta: 'Discover Récurra',
    secondaryCta: 'See my projects',
    stats: [
      { value: '3', label: 'company internships' },
      { value: '11.5', label: 'months of experience' },
      { value: '2027', label: 'internship search' },
    ],
    cardRole: 'Full-Stack Developer',
  },

  cv: {
    download: 'Download my CV',
    label: 'My CV:',
    fr: 'French',
    en: 'English',
  },

  about: {
    eyebrow: 'About',
    title: { line1: 'I turn ideas', before: 'into ', highlight: 'living web products', after: '.' },
    paragraphs: [
      'Engineering student in computer science and electronics at <b>ESEO</b>, I specialise in <b>software development and data</b>. Through my internships — at <b>SYSTRA in Dublin</b>, <b>Thales</b> and <b>Manitou</b> — I learned to ship real web applications, as part of a team and following Agile practices.',
      'I care as much about <b>the details of an interface</b> as about <b>a solid, well-designed back-end</b>. Curious and rigorous, I am looking for an internship starting February 2027 to put all of this into practice.',
    ],
    facts: [
      { icon: 'cap', label: 'Education', value: 'ESEO engineering degree — Software & Data' },
      { icon: 'pin', label: 'Location', value: 'France · open to relocation' },
      { icon: 'globe', label: 'Languages', value: 'French · English (B1) · Spanish (A2)' },
      { icon: 'spark', label: 'Looking for', value: 'Internship — from February 2027' },
    ],
  },

  skills: {
    eyebrow: 'Skills',
    title: { before: 'A complete ', highlight: 'full-stack', after: ' toolkit' },
    subtitle: 'From pixel to production: polished interfaces, robust APIs and containerised deployment.',
    groups: [
      {
        title: 'Frontend',
        icon: 'layout',
        items: ['Vue / Nuxt', 'React', 'Tailwind CSS', 'Bootstrap', 'HTML / CSS', 'JavaScript'],
      },
      {
        title: 'Backend',
        icon: 'server',
        items: ['Express.js', 'Spring', 'Node.js', 'REST API', 'SQL', 'Java'],
      },
      {
        title: 'Tools & DevOps',
        icon: 'box',
        items: ['Docker', 'Git', 'CI / CD', 'Linux', 'Postgres'],
      },
      {
        title: 'Testing & Quality',
        icon: 'check',
        items: ['Jest', 'Playwright', 'TypeScript', 'Agile'],
      },
    ],
  },

  experience: {
    eyebrow: 'Experience',
    title: { before: 'Hands-on ', highlight: 'experience', after: '' },
    items: [
      {
        role: 'Full-Stack Developer — Internship',
        company: 'SYSTRA',
        place: 'Dublin, Ireland',
        period: '5 months',
        tags: ['Web app', 'UI', 'English-speaking team'],
        description:
          'Developed a web application (user interface) within an international team of 15 people. A valuable experience in teamwork and communicating in English.',
      },
      {
        role: 'Full-Stack Developer — Internship',
        company: 'Thales',
        place: 'Cholet, France',
        period: '4.5 months',
        tags: ['Front-end', 'Back-end', 'Agile', 'Defence'],
        description:
          'Developed and maintained web applications, front-end and back-end, with modern technologies in an Agile environment, for the defence sector.',
      },
      {
        role: 'R&D Internship — Bachelor, 2nd year',
        company: 'Manitou',
        place: 'Ancenis, France',
        period: '2 months',
        tags: ['VBS', 'API', 'CAD data'],
        description: 'In the R&D department, wrote a VBS script that formats CAD data through an API.',
      },
    ],
    educationTitle: 'Education',
    education: [
      { title: 'Engineering degree — Software & Data', school: 'ESEO', period: '2025 — present' },
      { title: 'Bachelor in Computer Science & Electronics', school: 'ESEO', period: '2022 — 2025' },
    ],
    hobbiesTitle: 'Beyond code',
    hobbies:
      'Basketball point guard for 10 years, referee and volunteer. Passionate about finance and investing. Gym discipline, 6 times a week.',
  },

  projects: {
    eyebrow: 'Projects',
    title: { before: 'What I ', highlight: 'build', after: '' },
    openApp: 'Open the app',
    sourceCode: 'View the code',
    recurra: {
      badge: 'Flagship project · live',
      description:
        'Personal subscription tracker: spending overview, breakdown by category and trends over time. Designed, built and deployed end to end.',
      highlights: [
        'Bank statement import (.xlsx / .csv): recurring expenses are detected automatically (same amount at a monthly or yearly interval). The file is parsed in memory and never stored.',
        'Two isolated accounts: a personal one and a demo one reset on every login, so anyone can try it without breaking anything.',
        'Totals and detection logic covered by Vitest tests; deployable with Docker (self-hosted) or on Vercel + Neon.',
      ],
      alt: {
        main: 'Récurra dashboard: monthly and yearly totals, breakdown by category and cost per subscription',
        secondary: 'Récurra subscription list with filters, categories and upcoming payments',
      },
    },
    revu: {
      badge: 'SaaS · live',
      description:
        'Review-collection SaaS for local businesses: customers scan a QR code and rate their visit in seconds, no app required. Owners track their average rating and comment analysis, and get alerted when an issue keeps coming up.',
      highlights: [
        'Keyword analysis of comments: when an issue keeps coming up ("waiting", "cold"…), the owner gets an email alert.',
        'Built for serverless: rate limiting stored in PostgreSQL so it holds across instances, Vercel functions in the same region as the Neon database.',
        'JWT authentication, bcrypt-hashed passwords, email password reset; the public demo is reset every day by a cron job.',
      ],
      alt: {
        main: 'Revu owner dashboard: critical alert, average rating, trend and most mentioned words',
        secondary: 'Revu review page on mobile, opened after scanning the QR code',
      },
    },
    others: [
      {
        name: 'Basketball club manager',
        blurb: 'Web app to run a club: rosters, schedules and tracking.',
        stack: ['HTML', 'CSS', 'JavaScript'],
      },
      {
        name: 'Battleship game',
        blurb: 'Command-line game written in C, with grid logic and a simple AI.',
        stack: ['C'],
      },
      {
        name: 'Dinosaur game',
        blurb: 'Python remake of the T-Rex game, with collision handling and scoring.',
        stack: ['Python'],
      },
      {
        name: 'Breathalyser & Parking sensor',
        blurb: 'Embedded electronics projects: real-time measurement and signalling.',
        stack: ['STM32', 'Arduino', 'Analog'],
      },
    ],
  },

  contact: {
    eyebrow: 'Contact',
    title: { before: "Let's build something ", highlight: 'together', after: '' },
    subtitle: 'An internship, a project or just want to chat? My inbox is always open.',
    phone: 'Phone',
  },

  footer: {
    credits: 'Designed & built with Nuxt.',
    backToTop: 'Back to top ↑',
  },
}
