import { en, zh_cn } from '@nuxt/ui/locale'
import { isAppLocale, resolveLocale } from '~/locales'

const uiLocales = { 'zh-CN': zh_cn, en }

export function useAppLocale() {
  const i18n = useNuxtApp().$bugtiI18n
  const locale = computed(() => resolveLocale(i18n.locale.value))
  const uiLocale = computed(() => uiLocales[locale.value])

  function setLocale(value: unknown) {
    if (!isAppLocale(value)) return
    i18n.locale.value = value
  }

  return { locale, uiLocale, setLocale }
}
