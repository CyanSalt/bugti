<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
const { uiLocale } = useAppLocale()
useLocalizedHead()
</script>

<template>
  <UApp :locale="uiLocale">
    <NuxtRouteAnnouncer />
    <a
      href="#main-content"
      class="sr-only fixed top-3 left-3 z-50 rounded-lg bg-default px-4 py-2 text-highlighted focus:not-sr-only"
    >
      {{ t('common.skipContent') }}
    </a>
    <SiteHeader />
    <UMain id="main-content" tabindex="-1">
      <NuxtPage />
    </UMain>
    <SiteFooter />
  </UApp>
</template>
