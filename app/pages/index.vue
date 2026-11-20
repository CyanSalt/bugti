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
      class="home-hero"
      :title="t('home.title')"
      :description="t('home.description')"
      :ui="{
        container: 'py-14 sm:py-20 lg:py-24 gap-8',
        title: 'mx-auto max-w-4xl text-balance text-4xl/tight sm:text-6xl/tight',
        description: 'mx-auto max-w-[55ch] text-pretty text-base/7 sm:text-lg/8',
        footer: 'mt-8',
      }"
    >
      <template #links>
        <div class="flex flex-col items-center gap-4">
          <UButton id="test-entry" to="/test" :label="t('common.testEntry')" trailing-icon="i-lucide-arrow-right" size="xl" />
          <p class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-toned">
            <span>{{ t('home.testCount', { count: questions.length }) }}</span>
            <span>{{ t('home.testDuration') }}</span>
          </p>
        </div>
      </template>
    </UPageHero>

    <UContainer class="pb-14 sm:pb-20">
      <USeparator class="mb-10 sm:mb-12" />
      <UPageGrid class="gap-8 sm:grid-cols-1 lg:grid-cols-2 lg:gap-16">
        <UPageCard
          :as="{ root: 'section', title: 'h2' }"
          :description="t('home.dimensionsDescription')"
          variant="naked"
          :ui="{ description: 'mt-1 text-base/7 text-toned' }"
        >
          <template #title>
            <UButton to="/dimensions" :label="t('common.dimensions')" color="secondary" variant="link" trailing-icon="i-lucide-arrow-right" :ui="{ trailingIcon: 'size-5' }" class="px-0 py-2 text-xl sm:text-2xl" />
          </template>
        </UPageCard>
        <UPageCard
          :as="{ root: 'section', title: 'h2' }"
          :description="t('home.personalitiesDescription')"
          variant="naked"
          :ui="{ description: 'mt-1 text-base/7 text-toned' }"
        >
          <template #title>
            <UButton to="/personality-types" :label="t('common.personalityTypes')" color="accent" variant="link" trailing-icon="i-lucide-arrow-right" :ui="{ trailingIcon: 'size-5' }" class="px-0 py-2 text-xl sm:text-2xl" />
          </template>
        </UPageCard>
      </UPageGrid>
    </UContainer>
  </div>
</template>
