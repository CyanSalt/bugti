<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { dimensions } from '~/data/dimensions'
import { getPersonalitiesInGroup, getPersonalityPoles, personalities, personalityGroups } from '~/data/personalities'
import type { Personality } from '~/data/personalities'

const { t } = useI18n({ useScope: 'global' })
const groups = personalityGroups.map(group => ({ ...group, personalities: getPersonalitiesInGroup(group.id) }))
const selected = ref<Personality>(personalities[0]!)
const selectedGroup = computed(() => groups.find(group => group.personalities.some(type => type.code === selected.value.code))!)
const showClassification = ref(false)
const detail = useTemplateRef('detail')
const panel = useTemplateRef('panel')
let detailAnimation: Animation | undefined

async function selectPersonality(personality: Personality) {
  if (selected.value.code === personality.code) return
  detailAnimation?.cancel()
  selected.value = personality
  await nextTick()
  if (selected.value.code !== personality.code) return
  if (panel.value) panel.value.scrollTop = 0
  if (!detail.value || !detail.value.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  detailAnimation = detail.value.animate([
    { filter: 'blur(2px)', transform: 'translateX(6px)' },
    { filter: 'blur(0)', transform: 'translateX(0)' },
  ], { duration: 220, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' })
}

onBeforeUnmount(() => detailAnimation?.cancel())
useSeoMeta({
  title: () => t('typesPage.pageTitle'), description: () => t('typesPage.description'),
  ogTitle: () => t('typesPage.pageTitle'), ogDescription: () => t('typesPage.description'),
})
</script>

<template>
  <UContainer class="py-8 sm:py-12">
    <UPageHeader :title="t('typesPage.title')" :description="t('typesPage.description')" :ui="{ root: 'border-0 pb-0', title: 'text-3xl sm:text-4xl', description: 'max-w-3xl text-base/7' }" />

    <div class="mt-6 flex flex-wrap items-center justify-between gap-4">
      <nav class="flex flex-wrap gap-2" :aria-label="t('typesPage.groupNavigation')">
        <UButton v-for="group in groups" :key="group.id" :to="`#group-${group.id}`" external color="neutral" variant="soft" :label="`${group.id} · ${t(`personalityGroups.${group.id}.title`)}`" :class="['whitespace-normal text-start', group.textClass]" />
      </nav>
      <UButton color="neutral" variant="link" :label="t('typesPage.classification')" :aria-expanded="showClassification" aria-controls="classification" :trailing-icon="showClassification ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'" class="px-0" @click="showClassification = !showClassification" />
    </div>
    <UCollapsible v-model:open="showClassification" :unmount-on-hide="false">
      <template #content>
        <section id="classification" class="mt-5 border-y border-default py-5" aria-labelledby="code-order-title">
          <h2 id="code-order-title" class="text-sm font-semibold text-highlighted">{{ t('typesPage.codeOrder') }}</h2>
          <dl class="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div v-for="dimension in dimensions" :key="dimension.id">
              <dt class="text-sm text-toned">{{ t(`dimensions.${dimension.id}.title`) }}</dt>
              <dd class="mt-1 font-semibold text-highlighted">{{ dimension.left.code }} / {{ dimension.right.code }}</dd>
            </div>
          </dl>
          <p class="mt-4 max-w-3xl text-sm/7 text-toned">{{ t('typesPage.grouping') }}</p>
        </section>
      </template>
    </UCollapsible>

    <div class="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] xl:gap-16">
      <div class="min-w-0 space-y-10">
        <section v-for="group in groups" :id="`group-${group.id}`" :key="group.id" :aria-labelledby="`heading-${group.id}`">
          <div class="mb-4 flex items-baseline gap-3 border-b border-default pb-3">
            <h2 :id="`heading-${group.id}`" :class="['text-2xl font-bold', group.textClass]">{{ t(`personalityGroups.${group.id}.title`) }}</h2>
            <span :class="['text-sm font-semibold', group.textClass]">{{ group.id }}</span>
          </div>
          <p class="mb-3 text-sm/7 text-toned">{{ t(`personalityGroups.${group.id}.description`) }}</p>
          <div class="space-y-1">
            <PersonalityCard v-for="personality in group.personalities" :key="personality.code" :personality="personality" :group="group" :selected="selected.code === personality.code" @select="selectPersonality" />
          </div>
        </section>
      </div>

      <aside class="sticky top-24 hidden min-w-0 lg:block" :aria-label="t('typesPage.archive')">
        <UCard :ui="{ body: 'p-0' }">
          <div ref="panel" tabindex="0" aria-labelledby="archive-name" class="h-[min(38rem,calc(100dvh-7rem))] overflow-y-auto p-7 xl:p-10">
          <div id="archive-detail" ref="detail" aria-live="polite" aria-atomic="true">
            <div class="flex items-start justify-between gap-5">
              <div class="min-w-0">
                <h2 id="archive-name" :class="['text-3xl font-bold text-balance xl:text-4xl', selectedGroup.textClass]">{{ t(`personalities.${selected.code}.name`) }}</h2>
                <p :class="['mt-3 text-sm font-semibold', selectedGroup.textClass]">{{ t(`personalityGroups.${selectedGroup.id}.title`) }} · {{ selectedGroup.id }}</p>
              </div>
              <UIcon :name="selected.icon" :class="['size-12 shrink-0', selectedGroup.textClass]" aria-hidden="true" />
            </div>
            <p class="mt-3 text-lg font-semibold tracking-wider text-muted">{{ selected.code }}</p>
            <p class="mt-6 text-xl/8 font-medium text-highlighted">{{ t(`personalities.${selected.code}.summary`) }}</p>
            <USeparator class="my-7" />
            <p class="text-base/8 text-toned">{{ t(`personalities.${selected.code}.description`) }}</p>
            <dl class="mt-8 grid grid-cols-2 gap-x-5 gap-y-4">
              <div v-for="pole in getPersonalityPoles(selected.code)" :key="pole.code" class="flex items-baseline gap-2">
                <dt :class="['text-lg font-bold', selectedGroup.textClass]">{{ pole.code }}</dt>
                <dd class="text-sm text-toned">{{ t(`poles.${pole.code}.label`) }}</dd>
              </div>
            </dl>
          </div>
          </div>
        </UCard>
      </aside>
    </div>
  </UContainer>
</template>
