import { useI18n } from 'vue-i18n'

// Shared by regular pages and Nuxt's standalone error page to synchronize HTML attributes and SEO.
export function useLocalizedHead() {
  const { t } = useI18n({ useScope: 'global' })
  const { locale } = useAppLocale()

  useHead(() => ({ htmlAttrs: { lang: locale.value, dir: 'ltr' } }))
  useSeoMeta({
    title: () => t('common.siteTitle'),
    description: () => t('common.siteDescription'),
    ogTitle: () => t('common.siteTitle'),
    ogDescription: () => t('common.siteDescription'),
    ogLocale: () => locale.value.replace('-', '_'),
  })
}
