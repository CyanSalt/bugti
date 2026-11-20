<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
useSeoMeta({ title: () => t('about.pageTitle') })
</script>

<template>
  <UContainer class="max-w-[calc(65ch+4rem)] py-14 sm:py-20">
    <UPageHeader :title="t('common.aboutBugti')" :description="t('about.description')" :ui="{ root: 'pb-8', title: 'text-3xl sm:text-4xl', description: 'text-base/7' }" />
    <div class="space-y-10 pt-8">
      <UPageCard :as="{ root: 'section', title: 'h2' }" :title="t('about.purposeTitle')" :description="t('about.purpose')" variant="naked" :ui="{ title: 'text-xl', description: 'mt-3 text-base/8 text-toned' }" />
      <UPageCard :as="{ root: 'section', title: 'h2' }" :title="t('about.limitsTitle')" :description="t('about.limits')" variant="naked" :ui="{ title: 'text-xl', description: 'mt-3 text-base/8 text-toned' }" />
      <USeparator />
      <UButton to="/dimensions" :label="t('about.explore')" trailing-icon="i-lucide-arrow-right" size="lg" />
    </div>
  </UContainer>
</template>
