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

Le chemin de base et les liens vers Récurra et Revu sont pilotés par variables (aucune
valeur en dur). Voir [`.env.example`](.env.example).

| Variable                 | Vercel (défaut)                        | Freebox                        |
| ------------------------ | -------------------------------------- | ------------------------------ |
| `NUXT_APP_BASE_URL`      | `/` (rien à définir)                   | `/portfolio/` (via Dockerfile) |
| `NUXT_PUBLIC_RECURRA_URL`| `https://recurra-smoky.vercel.app`     | `/recurra/` ou l'URL absolue   |
| `NUXT_PUBLIC_REVU_URL`   | `https://revu-pink.vercel.app` (défaut)| idem (défaut)                  |

## Déploiement Docker (Freebox / serveur)

Même approche que Récurra : image multi-stage, runtime Nitro autonome.

```bash
docker compose up -d --build
```

Le portfolio écoute alors sur le port **3001** de l'hôte (modifiable dans
`docker-compose.yml`).

> Le site est servi sous le chemin **`/portfolio/`** : le `Dockerfile` définit
> `NUXT_APP_BASE_URL=/portfolio/` au build (le défaut du projet est la racine
> `/`). Derrière le DNS, chaque app a son segment d'URL (`/portfolio/`,
> `/recurra/`, …).

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

## Déploiement Vercel (site statique)

Le portfolio n'a besoin d'aucun serveur : il est **généré en statique**
(`nuxt generate`) et servi comme de simples fichiers. Le [`vercel.json`](vercel.json)
fige ce comportement (build `nuxt generate`, sortie `.output/public`, pas de
preset serveur) — c'est **déterministe** et ça évite les soucis de routage des
fichiers `_nuxt` rencontrés avec le mode SSR.

1. **Importer le dépôt** : sur [vercel.com](https://vercel.com) → *Add New…* →
   *Project* → sélectionner le repo GitHub `portfolio2`. Ne pas surcharger les
   *Build & Output Settings* : `vercel.json` s'en charge.
2. **Variable d'environnement** (onglet *Settings → Environment Variables*,
   *Production* et *Preview*) — une seule est utile :

   | Nom                       | Valeur                              |
   | ------------------------- | ----------------------------------- |
   | `NUXT_PUBLIC_RECURRA_URL` | `https://recurra-smoky.vercel.app`  |

   `NUXT_APP_BASE_URL` n'est **pas** nécessaire : la racine `/` est le défaut.

3. **Deploy** (au premier déploiement, coche *Clear build cache* si un ancien
   build SSR traînait). Chaque `git push` sur `main` redéploie automatiquement.

> Le lien vers Récurra est figé au build depuis `NUXT_PUBLIC_RECURRA_URL` : si tu
> changes l'URL de Récurra, redéploie le portfolio pour la prendre en compte.

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
