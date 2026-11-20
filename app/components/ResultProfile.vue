<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { PersonalityCode } from '~/data/personalities'
import { personalities, personalityGroups } from '~/data/personalities'

const props = defineProps<{ code: PersonalityCode }>()
const { t } = useI18n({ useScope: 'global' })
const personality = computed(() => personalities.find(personality => personality.code === props.code)!)
const group = computed(() => personalityGroups.find(group => group.poles.every(pole => props.code.includes(pole)))!)
</script>

<template>
  <UCard :ui="{ body: 'p-6 sm:p-9' }">
    <div class="flex items-start justify-between gap-5">
      <div>
        <p class="text-sm font-medium text-muted">{{ t('result.yourType') }}</p>
        <h1 :class="['mt-3 text-4xl font-bold sm:text-5xl', group.textClass]">{{ t(`personalities.${code}.name`) }}</h1>
        <p class="mt-3 text-lg font-semibold tracking-widest text-highlighted">{{ code }}</p>
      </div>
      <UIcon :name="personality.icon" :class="['mt-6 size-12 shrink-0 sm:size-16', group.textClass]" aria-hidden="true" />
    </div>
    <p class="mt-6 text-xl/8 font-medium text-highlighted">{{ t(`personalities.${code}.summary`) }}</p>
    <p class="mt-5 text-base/8 text-toned">{{ t(`personalities.${code}.description`) }}</p>
    <USeparator class="my-7" />
    <div class="space-y-6">
      <section v-for="key in ['inPractice', 'watchFor', 'collaboration']" :key="key">
        <h2 class="text-sm font-semibold text-highlighted">{{ t(`result.${key}`) }}</h2>
        <p class="mt-2 text-base/8 text-toned">{{ t(`personalities.${code}.${key}`) }}</p>
      </section>
    </div>
  </UCard>
</template>
