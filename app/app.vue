<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
const { uiLocale } = useAppLocale()
useLocalizedHead()

const pageShell = useTemplateRef('pageShell')
let pageAnimation: Animation | undefined
let pageAnimationTimer: ReturnType<typeof setTimeout> | undefined
const nuxtApp = useNuxtApp()
const removePageHook = nuxtApp.hook('page:finish', () => {
  if (!import.meta.client) return
  pageAnimation?.cancel()
  clearTimeout(pageAnimationTimer)
  if (!pageShell.value?.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  pageAnimation = pageShell.value.animate([
    { transform: 'translateY(4px)', filter: 'blur(1px)' },
    { transform: 'translateY(0)', filter: 'blur(0)' },
  ], { duration: 140, easing: 'ease-out' })
  pageAnimationTimer = setTimeout(() => pageAnimation?.cancel(), 160)
})
onBeforeUnmount(() => {
  removePageHook()
  pageAnimation?.cancel()
  clearTimeout(pageAnimationTimer)
})

function skipToContent() {
  const main = document.getElementById('main-content')
  main?.focus({ preventScroll: true })
  main?.scrollIntoView({ block: 'start', behavior: 'instant' })
}
</script>

<template>
  <UApp :locale="uiLocale">
    <NuxtRouteAnnouncer />
    <a
      href="#main-content"
      class="sr-only fixed top-3 left-3 z-50 rounded-lg bg-default px-4 py-2 text-highlighted focus:not-sr-only"
      @click.prevent="skipToContent"
    >
      {{ t('common.skipContent') }}
    </a>
    <SiteHeader />
    <UMain id="main-content" tabindex="-1">
      <div ref="pageShell"><NuxtPage /></div>
    </UMain>
    <SiteFooter />
  </UApp>
</template>
