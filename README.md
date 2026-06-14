# Portfolio — Pierre Van Elsuve

Portfolio personnel : présentation, compétences, parcours et projets.
Site vitrine élégant construit avec **Nuxt 3**, **Tailwind CSS**, **@vueuse/motion** et **GSAP**.

## Stack

- **Nuxt 3 / Nitro** — rendu et serveur (même base que Récurra)
- **Tailwind CSS** — design system (thème sombre, dégradés, glassmorphism)
- **@vueuse/motion** — animations au scroll
- **GSAP** — animations du hero et parallaxe
- **@nuxt/fonts** — polices auto-hébergées (Sora, Space Grotesk, Inter)

## Développement

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build de production

```bash
npm run build
node .output/server/index.mjs
```

## Déploiement Docker (Freebox / serveur)

Même approche que Récurra : image multi-stage, runtime Nitro autonome.

```bash
docker compose up -d --build
```

Le portfolio écoute alors sur le port **3001** de l'hôte (modifiable dans
`docker-compose.yml`).

> Le site est servi sous le chemin **`/portfolio/`** (`baseURL` dans
> `nuxt.config.ts`) : derrière le DNS, chaque app a son segment d'URL
> (`/portfolio/`, `/recurra/`, …).

### Lien vers Récurra

Le portfolio renvoie vers l'application **Récurra** via la variable
`NUXT_PUBLIC_RECURRA_URL` (par défaut `/recurra/`).

Sur la Freebox, l'idée est de placer un **reverse proxy** (Nginx Proxy Manager,
Traefik, ou le proxy intégré) sur un même domaine :

| Chemin        | Conteneur            | Port interne |
| ------------- | -------------------- | ------------ |
| `/portfolio/` | `portfolio`          | 3000         |
| `/recurra/`   | `recurra` (`app`)    | 3000         |

> Astuce : tu peux aussi rediriger la racine `/` vers `/portfolio/` au niveau
> du reverse proxy pour que le portfolio soit la page d'accueil du domaine.

Récurra est déjà configuré avec `baseURL: '/recurra/'` (cf. son `nuxt.config.ts`),
donc le lien `/recurra/` du portfolio tombe directement sur l'application une fois
le proxy en place. Pour pointer ailleurs (sous-domaine, autre port), définir par
exemple :

```bash
NUXT_PUBLIC_RECURRA_URL=https://recurra.mondomaine.fr docker compose up -d --build
```

## Structure

```
app.vue                 # Assemble les sections + fond aurora
components/
  AuroraBackground.vue  # Fond animé (taches floutées + grille)
  TheHeader.vue         # Nav verre dépoli, smooth-scroll
  HeroSection.vue       # Hero animé GSAP + parallaxe souris
  AboutSection.vue      # Présentation + faits clés
  SkillsSection.vue     # Compétences + bandeau défilant
  ExperienceSection.vue # Timeline stages + formation
  ProjectsSection.vue   # Récurra (phare) + autres projets
  ContactSection.vue    # Email, LinkedIn, téléphone
  TheFooter.vue
assets/css/main.css     # Tailwind + composants (glass, boutons, dégradés)
tailwind.config.ts      # Couleurs, animations (aurora, marquee, float)
```
