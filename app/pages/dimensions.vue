<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { dimensions } from '~/data/dimensions'

const { t } = useI18n({ useScope: 'global' })
useSeoMeta({
  title: () => t('dimensionsPage.pageTitle'),
  description: () => t('dimensionsPage.description'),
  ogTitle: () => t('dimensionsPage.pageTitle'),
  ogDescription: () => t('dimensionsPage.description'),
})
</script>

<template>
  <UContainer class="py-10 sm:py-16">
    <UPageHeader
      :title="t('dimensionsPage.title')"
      :description="t('dimensionsPage.description')"
      :ui="{ root: 'border-0 pb-0', title: 'text-3xl sm:text-4xl', description: 'max-w-3xl text-base/7' }"
    />

    <dl class="mt-8 grid grid-cols-2 gap-4 rounded-xl bg-primary/10 px-5 py-6 sm:grid-cols-4 sm:px-8" :aria-label="t('dimensionsPage.pairsLabel')">
      <div v-for="dimension in dimensions" :key="dimension.id" class="text-center">
        <dt class="text-sm text-toned">{{ t(`dimensions.${dimension.id}.title`) }}</dt>
        <dd class="mt-1.5 text-xl font-bold tracking-wide text-primary sm:text-2xl">{{ dimension.left.code }} / {{ dimension.right.code }}</dd>
      </div>
    </dl>

    <UPageGrid class="mt-8 lg:grid-cols-2">
      <DimensionCard v-for="dimension in dimensions" :key="dimension.id" :dimension="dimension" />
    </UPageGrid>
  </UContainer>
</template>
