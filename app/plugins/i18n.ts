import { createI18n } from 'vue-i18n'
import { defaultLocale, isAppLocale, localeCookieName, messages, resolveBrowserLocale, resolveLocale } from '~/locales'
import { readResultQuery } from '~/utils/resultLink'

export default defineNuxtPlugin((nuxtApp) => {
  const savedLocale = useCookie<string>(localeCookieName, {
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  })
  const browserLocales = import.meta.server
    ? (useRequestHeaders(['accept-language'])['accept-language'] ?? '').split(',').map(value => value.trim().split(';', 1)[0]!)
    : navigator.languages

  const url = useRequestURL()
  const query: Record<string, unknown> = {}
  for (const key of new Set(url.searchParams.keys())) {
    const values = url.searchParams.getAll(key)
    query[key] = values.length === 1 ? values[0] : values
  }
  const linkedResult = (url.pathname === '/result' || url.pathname === '/test') ? readResultQuery(query) : null

  // Create an isolated instance per SSR request; linked locale also matches client hydration.
  const i18n = createI18n({
    legacy: false,
    globalInjection: false,
    locale: linkedResult?.status === 'valid'
      ? linkedResult.locale
      : isAppLocale(savedLocale.value) ? savedLocale.value : resolveBrowserLocale(browserLocales),
    fallbackLocale: defaultLocale,
    messages,
  })

  nuxtApp.vueApp.use(i18n)
  watch(i18n.global.locale, locale => { savedLocale.value = resolveLocale(locale) }, { flush: 'sync', immediate: true })

  return { provide: { bugtiI18n: i18n.global } }
})
