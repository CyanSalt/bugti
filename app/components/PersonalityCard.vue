<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { getPersonalityPoles } from '~/data/personalities'
import type { Personality, personalityGroups } from '~/data/personalities'

const props = defineProps<{
  personality: Personality
  group: typeof personalityGroups[number]
  selected: boolean
}>()
const emit = defineEmits<{ select: [personality: Personality] }>()
const { t } = useI18n({ useScope: 'global' })
const open = ref(false)
</script>

<template>
  <div :id="personality.code" class="min-w-0">
    <UButton
      :id="`select-${personality.code}`"
      color="neutral"
      variant="ghost"
      :aria-pressed="selected"
      :aria-label="t('typesPage.selectType', { name: t(`personalities.${personality.code}.name`), code: personality.code })"
      :class="['archive-choice hidden w-full items-start gap-4 rounded-xl p-4 text-start lg:flex', selected ? group.surfaceClass : '']"
      @click="emit('select', props.personality)"
    >
      <UIcon :name="personality.icon" :class="['mt-1 size-6 shrink-0', group.textClass]" aria-hidden="true" />
      <span class="min-w-0 flex-1">
        <span class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <span :class="['text-lg font-semibold', selected ? group.textClass : 'text-highlighted']">{{ t(`personalities.${personality.code}.name`) }}</span>
          <span class="text-xs font-semibold tracking-wide text-muted">{{ personality.code }}</span>
        </span>
        <span class="mt-2 block text-sm/6 font-normal text-toned">{{ t(`personalities.${personality.code}.summary`) }}</span>
      </span>
      <UIcon name="i-lucide-arrow-up-right" :class="['mt-1 size-4 shrink-0 transition-opacity', selected ? 'opacity-100' : 'opacity-0']" aria-hidden="true" />
    </UButton>

    <UCollapsible v-model:open="open" :unmount-on-hide="false" class="lg:hidden">
      <UButton
        color="neutral"
        variant="ghost"
        :aria-label="t(open ? 'typesPage.readLessLabel' : 'typesPage.readMoreLabel', { name: t(`personalities.${personality.code}.name`), code: personality.code })"
        :class="['w-full items-start gap-3 rounded-xl p-4 text-start', open ? group.surfaceClass : '']"
      >
        <UIcon :name="personality.icon" :class="['mt-1 size-6 shrink-0', group.textClass]" aria-hidden="true" />
        <span class="min-w-0 flex-1">
          <span class="flex flex-wrap items-baseline justify-between gap-2">
            <span :class="['text-lg font-semibold', group.textClass]">{{ t(`personalities.${personality.code}.name`) }}</span>
            <span class="text-xs font-semibold tracking-wide text-muted">{{ personality.code }}</span>
          </span>
          <span class="mt-2 block text-sm/6 font-normal text-toned">{{ t(`personalities.${personality.code}.summary`) }}</span>
        </span>
        <UIcon name="i-lucide-chevron-down" :class="['mt-1 size-4 shrink-0 transition-transform duration-200', open ? 'rotate-180' : '']" aria-hidden="true" />
      </UButton>
      <template #content>
        <div class="px-4 pb-5">
        <p class="pt-3 text-sm/7 text-toned">{{ t(`personalities.${personality.code}.description`) }}</p>
        <div class="mt-4 flex flex-wrap gap-2">
          <UBadge v-for="pole in getPersonalityPoles(personality.code)" :key="pole.code" :label="`${pole.code} · ${t(`poles.${pole.code}.label`)}`" color="neutral" variant="soft" />
        </div>
        </div>
      </template>
    </UCollapsible>
  </div>
</template>
