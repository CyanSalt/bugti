import { fileURLToPath } from 'node:url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

export default defineNuxtConfig({
  vite: {
    // Bundle internal chunks before Nitro so pnpm store paths do not leak.
    ssr: { noExternal: ['tailwind-variants', '@iconify/utils'] },
    plugins: [VueI18nPlugin({
      include: [fileURLToPath(new URL('./app/locales/*.json', import.meta.url))],
      ssr: true,
    })],
  },
  modules: ['@nuxt/ui', '@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: false },
  compatibilityDate: '2026-11-19',
  ui: { fonts: false },
  colorMode: { preference: 'light', fallback: 'light' },
  icon: {
    serverBundle: { collections: ['lucide'] },
    clientBundle: { scan: true },
  },
  app: {
    head: {
      meta: [
        { name: 'theme-color', content: '#00a86b' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  typescript: { strict: true },
})
