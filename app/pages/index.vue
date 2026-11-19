<script setup lang="ts">
import { dimensions } from '~/data/dimensions'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
useSeoMeta({
  ogDescription: () => t('home.title'),
})
</script>

<template>
  <div>
    <UPageHero
      :title="t('home.title')"
      :description="t('home.description')"
      :ui="{
        container: 'pt-16 pb-14 sm:pt-24 sm:pb-20 gap-8',
        title: 'mx-auto max-w-4xl text-4xl/normal sm:text-6xl/tight',
        description: 'mx-auto max-w-2xl text-base/7 sm:text-lg/8',
        footer: 'mt-8',
      }"
    >
      <template #links>
        <div class="flex flex-col items-center gap-4">
          <div class="flex flex-wrap justify-center gap-3">
            <UButton id="test-entry" to="/test" :label="t('common.testEntry')" trailing-icon="i-lucide-arrow-right" size="xl" />
            <UButton to="#dimensions" external :label="t('home.explore')" color="neutral" variant="outline" size="xl" />
          </div>
          <p class="flex max-w-md items-start justify-center gap-2 text-sm text-muted">
            <UIcon name="i-lucide-construction" class="mt-0.5 size-4 shrink-0" />
            <span>{{ t('home.pending') }}</span>
          </p>
        </div>
      </template>
    </UPageHero>

    <UContainer>
      <div class="grid grid-cols-2 gap-4 rounded-xl bg-primary/10 px-5 py-6 sm:grid-cols-4 sm:px-8" :aria-label="t('home.pairsLabel')">
        <div v-for="dimension in dimensions" :key="dimension.id" class="text-center">
          <p class="text-xl font-bold tracking-wide text-primary sm:text-2xl">{{ dimension.left.code }} / {{ dimension.right.code }}</p>
          <p class="mt-1.5 text-sm text-toned">{{ t(`dimensions.${dimension.id}.title`) }}</p>
        </div>
      </div>
    </UContainer>

    <UPageSection
      id="dimensions"
      :title="t('home.dimensionsTitle')"
      :description="t('home.dimensionsDescription')"
      :ui="{
        container: 'py-14 sm:py-20 gap-8 sm:gap-10',
        title: 'text-2xl sm:text-3xl',
        description: 'text-base/7',
      }"
    >
      <UPageGrid class="lg:grid-cols-2">
        <DimensionCard v-for="dimension in dimensions" :key="dimension.id" :dimension="dimension" />
      </UPageGrid>
      <div class="flex justify-center">
        <UButton to="/personality-types" :label="t('common.personalityTypes')" trailing-icon="i-lucide-arrow-right" size="lg" />
      </div>
    </UPageSection>
  </div>
</template>
