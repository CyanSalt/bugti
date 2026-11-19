<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
useSeoMeta({ title: () => t('about.pageTitle') })
</script>

<template>
  <UContainer class="max-w-3xl py-14 sm:py-20">
    <UPageHeader :title="t('common.aboutBugti')" :description="t('about.description')" :ui="{ root: 'pb-8', title: 'text-3xl sm:text-4xl', description: 'text-base' }" />
    <div class="space-y-10 pt-8">
      <section aria-labelledby="purpose-title" class="space-y-3">
        <h2 id="purpose-title" class="text-xl font-semibold text-highlighted">{{ t('about.purposeTitle') }}</h2>
        <p class="text-base/8 text-toned">{{ t('about.purpose') }}</p>
      </section>
      <section aria-labelledby="limits-title" class="space-y-3">
        <h2 id="limits-title" class="text-xl font-semibold text-highlighted">{{ t('about.limitsTitle') }}</h2>
        <p class="text-base/8 text-toned">{{ t('about.limits') }}</p>
      </section>
      <USeparator />
      <UButton to="/#dimensions" :label="t('about.explore')" trailing-icon="i-lucide-arrow-right" size="lg" />
    </div>
  </UContainer>
</template>
