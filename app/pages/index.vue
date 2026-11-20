<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { questions } from '~/data/questionnaire'

const { t } = useI18n({ useScope: 'global' })
useSeoMeta({
  description: () => t('home.description'),
  ogDescription: () => t('home.description'),
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
          <UButton id="test-entry" to="/test" :label="t('common.testEntry')" trailing-icon="i-lucide-arrow-right" size="xl" />
          <p class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-toned">
            <span class="inline-flex items-center gap-2"><UIcon name="i-lucide-list-checks" class="size-4" />{{ t('home.testCount', { count: questions.length }) }}</span>
            <span class="inline-flex items-center gap-2"><UIcon name="i-lucide-clock-3" class="size-4" />{{ t('home.testDuration') }}</span>
          </p>
        </div>
      </template>
    </UPageHero>

    <UContainer class="pb-14 sm:pb-20">
      <USeparator class="mb-10 sm:mb-12" />
      <UPageGrid class="gap-10 sm:grid-cols-1 lg:grid-cols-2 lg:gap-16">
        <UPageCard
          :as="{ root: 'section', title: 'h2' }"
          :title="t('common.dimensions')"
          :description="t('home.dimensionsDescription')"
          variant="naked"
          :ui="{ title: 'text-2xl sm:text-3xl', description: 'mt-4 text-base/7 text-toned', footer: 'pt-6' }"
        >
          <template #footer>
            <UButton to="/dimensions" :label="t('common.exploreDimensions')" color="neutral" variant="link" trailing-icon="i-lucide-arrow-right" size="lg" class="px-0" />
          </template>
        </UPageCard>
        <UPageCard
          :as="{ root: 'section', title: 'h2' }"
          :title="t('common.personalityTypes')"
          :description="t('home.personalitiesDescription')"
          variant="naked"
          :ui="{ title: 'text-2xl sm:text-3xl', description: 'mt-4 text-base/7 text-toned', footer: 'pt-6' }"
        >
          <template #footer>
            <UButton to="/personality-types" :label="t('home.explorePersonalities')" color="neutral" variant="link" trailing-icon="i-lucide-arrow-right" size="lg" class="px-0" />
          </template>
        </UPageCard>
      </UPageGrid>
    </UContainer>
  </div>
</template>
