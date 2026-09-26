import { en } from '~/locales/en'
import { fr, type Messages } from '~/locales/fr'

/** Supported UI languages. English is the default. */
export type Locale = 'en' | 'fr'

const messages: Record<Locale, Messages> = { en, fr }

/** localStorage key remembering the visitor's language choice. */
const STORAGE_KEY = 'portfolio-locale'

/**
 * Shared locale state for the whole site.
 *
 * Deliberately a tiny hand-rolled solution rather than @nuxtjs/i18n: the site is
 * a single static page, so we only need a reactive dictionary and a toggle —
 * no localised routes, lazy loading or pluralisation.
 *
 * @returns
 *   - `locale`: current language (reactive, shared across components via useState)
 *   - `t`: computed dictionary for the current language
 *   - `setLocale(l)`: switch language and persist the choice
 *   - `toggleLocale()`: flip between English and French
 *   - `restoreLocale()`: apply the saved choice (call once, client-side, after mount)
 */
export function useLocale() {
  // useState (not a module-level ref) so the value is per-request during
  // prerendering and shared between all components on the client.
  const locale = useState<Locale>('locale', () => 'en')
  const t = computed(() => messages[locale.value])

  /**
   * Switch the UI language and remember it for the next visit.
   * @param l - Target locale.
   */
  function setLocale(l: Locale) {
    locale.value = l
    // Storage can throw (private mode, blocked site data): the switch must still work.
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {}
  }

  /** Flip between English and French. */
  function toggleLocale() {
    setLocale(locale.value === 'en' ? 'fr' : 'en')
  }

  /**
   * Apply the language saved in localStorage, if any.
   * Must run after hydration (onMounted): the static HTML is always rendered in
   * English, and changing the state earlier would cause a hydration mismatch.
   */
  function restoreLocale() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'en' || saved === 'fr') locale.value = saved
    } catch {}
  }

  return { locale, t, setLocale, toggleLocale, restoreLocale }
}
