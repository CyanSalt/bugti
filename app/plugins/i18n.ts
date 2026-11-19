import { createI18n } from 'vue-i18n'
import { defaultLocale, localeCookieName, messages, resolveLocale } from '~/locales'

export default defineNuxtPlugin((nuxtApp) => {
  const savedLocale = useCookie<string>(localeCookieName, {
    default: () => defaultLocale,
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  })

  // Create an isolated instance per SSR request; the cookie also initializes client hydration.
  const i18n = createI18n({
    legacy: false,
    globalInjection: false,
    locale: resolveLocale(savedLocale.value),
    fallbackLocale: defaultLocale,
    messages,
  })

  nuxtApp.vueApp.use(i18n)
  watch(i18n.global.locale, locale => { savedLocale.value = resolveLocale(locale) }, { flush: 'sync' })

  return { provide: { bugtiI18n: i18n.global } }
})
