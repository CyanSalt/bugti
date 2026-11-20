<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { personalities, personalityGroups, getPersonalitiesInGroup } from '~/data/personalities'
import type { PersonalityCode } from '~/data/personalities'

const { t } = useI18n({ useScope: 'global' })
const previewCodes = ['CFRU', 'CFEU', 'DFEA', 'DGEA'] as const satisfies readonly PersonalityCode[]
const previews = previewCodes.map(code => ({
  ...personalities.find(personality => personality.code === code)!,
  group: personalityGroups.find(group => getPersonalitiesInGroup(group.id).some(personality => personality.code === code))!,
}))
const reducedMotion = ref(false)

onMounted(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  const syncMotion = () => { reducedMotion.value = preference.matches }
  syncMotion()
  preference.addEventListener('change', syncMotion)
  onBeforeUnmount(() => preference.removeEventListener('change', syncMotion))
})
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    :items="previews"
    :aria-label="t('home.previewLabel')"
    :duration="reducedMotion ? 0 : 25"
    align="start"
    arrows
    :prev="{ variant: 'ghost', size: 'sm' }"
    :next="{ variant: 'ghost', size: 'sm' }"
    class="mx-auto w-full max-w-3xl text-start"
    :ui="{
      viewport: 'p-1',
      container: '-ms-6',
      item: 'ps-6 basis-full sm:basis-1/2 lg:basis-1/3',
      controls: 'mt-3 flex justify-center',
      arrows: 'flex items-center gap-3',
      prev: 'static translate-y-0',
      next: 'static translate-y-0',
    }"
  >
    <UPageCard
      :as="{ root: 'article', title: 'h2' }"
      :description="t(`personalities.${item.code}.summary`)"
      variant="naked"
      :ui="{ container: 'gap-3', description: 'text-sm/7 text-toned', header: 'w-full' }"
      class="min-h-24 px-2 sm:min-h-32"
    >
      <template #title>
        <UButton
          :to="`/personality-types#${item.code}`"
          :icon="item.icon"
          :label="t(`personalities.${item.code}.name`)"
          :aria-label="t('typesPage.selectType', { name: t(`personalities.${item.code}.name`), code: item.code })"
          :color="item.group.color"
          variant="link"
          class="px-0 py-1 text-xl font-semibold sm:text-2xl"
          :ui="{ leadingIcon: 'size-7 shrink-0' }"
        />
      </template>
    </UPageCard>
  </UCarousel>
</template>
