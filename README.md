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

## Déploiement

Le site se déploie sur **deux cibles en parallèle** (redondance : si la Freebox
tombe, Vercel reste en ligne) :

| Cible       | URL                                   | Chemin de base   |
| ----------- | ------------------------------------- | ---------------- |
| **Freebox** | `https://pierrepve.ddns.net/portfolio` | `/portfolio/`    |
| **Vercel**  | `https://<projet>.vercel.app`          | `/` (racine)     |

### Variables d'environnement

Le chemin de base et le lien vers Récurra sont pilotés par variables (aucune
valeur en dur). Voir [`.env.example`](.env.example).

| Variable                 | Freebox                              | Vercel                                 |
| ------------------------ | ------------------------------------ | -------------------------------------- |
| `NUXT_APP_BASE_URL`      | `/portfolio/` (défaut)               | `/`                                    |
| `NUXT_PUBLIC_RECURRA_URL`| `/recurra/` ou l'URL absolue         | `https://pierrepve.ddns.net/recurra`   |

## Déploiement Docker (Freebox / serveur)

Même approche que Récurra : image multi-stage, runtime Nitro autonome.

```bash
docker compose up -d --build
```

Le portfolio écoute alors sur le port **3001** de l'hôte (modifiable dans
`docker-compose.yml`).

> Le site est servi sous le chemin **`/portfolio/`** : c'est la valeur par
> défaut de `NUXT_APP_BASE_URL` (cf. `nuxt.config.ts`), donc rien à définir
> côté Docker. Derrière le DNS, chaque app a son segment d'URL
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

## Déploiement Vercel (miroir gratuit)

Nuxt est détecté automatiquement par Vercel (preset Nitro `vercel`, build
`nuxt build`) — aucun `vercel.json` requis.

1. **Importer le dépôt** : sur [vercel.com](https://vercel.com) → *Add New…* →
   *Project* → sélectionner le repo GitHub `portfolio2`. Framework détecté :
   *Nuxt.js*. Laisser les commandes par défaut.
2. **Définir les variables d'environnement** (onglet *Settings → Environment
   Variables*, pour *Production* et *Preview*) :

   | Nom                       | Valeur                                 |
   | ------------------------- | -------------------------------------- |
   | `NUXT_APP_BASE_URL`       | `/`                                    |
   | `NUXT_PUBLIC_RECURRA_URL` | `https://pierrepve.ddns.net/recurra`   |

3. **Deploy**. Chaque `git push` sur `main` redéploie automatiquement.

> Important : sans `NUXT_APP_BASE_URL=/`, le site sortirait sous
> `/portfolio/` sur le domaine Vercel (défaut Freebox) et les assets
> seraient introuvables à la racine. Cette variable est donc indispensable
> côté Vercel.

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
