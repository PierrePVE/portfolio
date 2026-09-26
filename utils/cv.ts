import type { Locale } from '~/composables/useLocale'

/**
 * CV PDF paths, relative to `public/` (no leading slash).
 *
 * Kept relative on purpose: callers prefix them with the app base URL, because
 * plain hrefs to public files are not rewritten by Nuxt and would break on the
 * sub-path deployment (NUXT_APP_BASE_URL=/portfolio/).
 */
export const CV_FILES: Record<Locale, string> = {
  fr: 'cv/Pierre-Van-Elsuve-CV-FR.pdf',
  en: 'cv/Pierre-Van-Elsuve-CV-EN.pdf',
}

/**
 * Build the public URL of the CV in a given language.
 * @param l - Language of the CV.
 * @returns URL including the app base path (e.g. "/cv/…" or "/portfolio/cv/…").
 */
export function cvUrl(l: Locale): string {
  return `${useRuntimeConfig().app.baseURL}${CV_FILES[l]}`
}
