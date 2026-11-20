<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { questions, questionnaireVersion, scoringVersion } from '~/data/questionnaire'
import { createResultPath, readResultQuery } from '~/utils/resultLink'
import type { ResultLink } from '~/utils/resultLink'
import { scoreLegacyQuestionnaire, scoreQuestionnaire } from '~/utils/scoring'

const { t } = useI18n({ useScope: 'global' })
const { locale, setLocale } = useAppLocale()
const route = useRoute()
const requestUrl = useRequestURL()
const link = computed<ResultLink>(() => readResultQuery(route.query))
const result = computed(() => {
  const restored = link.value
  if (restored.status !== 'valid') return null
  return restored.version === questionnaireVersion ? scoreQuestionnaire(restored.answers) : scoreLegacyQuestionnaire(restored.answers)
})
const legacy = computed(() => link.value.status === 'valid' && link.value.version !== questionnaireVersion)
const copied = ref(false)
const copyFailed = ref(false)
const linkInput = useTemplateRef('linkInput')
const showAnswers = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | undefined
const resultPath = computed(() => {
  const restored = link.value
  if (restored.status !== 'valid') return ''
  return restored.version === questionnaireVersion
    ? createResultPath(restored.answers, locale.value) : `/result?r=${route.query.r}`
})
const shareUrl = computed(() => resultPath.value ? new URL(resultPath.value, requestUrl.origin).href : '')
const editPath = computed(() => resultPath.value.replace('/result?', '/test?'))
const completePoles = computed(() => result.value?.dimensions.flatMap(score => score.status === 'complete' && score.pole ? [score.pole] : []) ?? [])
const allBalanced = computed(() => result.value?.status === 'balanced' && result.value.candidates.length === 16)

watch(() => route.query.r, () => {
  if (link.value.status === 'valid') setLocale(link.value.locale)
  copied.value = false
  copyFailed.value = false
}, { immediate: true })
onBeforeUnmount(() => clearTimeout(copyTimer))

async function copyLink() {
  if (!shareUrl.value) return
  clearTimeout(copyTimer)
  try {
    await navigator.clipboard.writeText(shareUrl.value)
    copied.value = true
    copyFailed.value = false
    copyTimer = setTimeout(() => { copied.value = false }, 2500)
  }
  catch {
    copied.value = false
    copyFailed.value = true
    await nextTick()
    linkInput.value?.inputRef?.focus()
    linkInput.value?.inputRef?.select()
  }
}

useSeoMeta({ title: () => t('result.pageTitle'), robots: 'noindex, nofollow', referrer: 'no-referrer' })
</script>

<template>
  <div>
  <UContainer class="py-10 sm:py-14">
    <UEmpty
      v-if="!result"
      :as="{ root: 'section', title: 'h1' }"
      :icon="link.status === 'invalid' ? 'i-lucide-link-2-off' : 'i-lucide-file-search'"
      :title="t(link.status === 'invalid' ? 'result.invalidTitle' : 'result.title')"
      :description="t(link.status === 'invalid' ? 'result.invalidDescription' : 'result.description')"
      variant="naked"
      size="xl"
      class="min-h-[60vh]"
      :actions="[{ label: t('common.testEntry'), to: '/test', trailingIcon: 'i-lucide-arrow-right' }, { label: t('common.backHome'), to: '/', color: 'neutral', variant: 'outline' }]"
    />

    <div v-else class="mx-auto max-w-6xl">
      <div class="mb-7 flex flex-wrap items-center justify-between gap-4">
        <p class="text-sm font-medium text-muted">{{ t('result.yourProfile') }}</p>
        <div class="flex flex-wrap gap-2">
          <UButton color="neutral" variant="ghost" to="/test?new=1" :label="t('result.retake')" />
          <UButton v-if="!legacy" color="neutral" variant="outline" icon="i-lucide-pencil" :to="editPath" :label="t('result.editAnswers')" />
          <UButton :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'" :label="t(copied ? 'result.copied' : 'result.copyLink')" @click="copyLink" />
        </div>
      </div>

      <UAlert v-if="legacy" class="mb-7" color="neutral" variant="soft" :description="t('result.legacyNotice')" />
      <UPageGrid class="items-start gap-7 sm:grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div class="min-w-0">
          <ResultProfile v-if="result.type" :code="result.type" />
          <UCard v-else :ui="{ body: 'p-6 sm:p-9' }">
            <UIcon name="i-lucide-scale" class="size-12 text-primary" />
            <h1 class="mt-5 text-3xl/10 font-bold">{{ t(result.status === 'incomplete' ? 'result.incompleteTitle' : 'result.balancedTitle') }}</h1>
            <p class="mt-4 text-base/8 text-toned">{{ t(result.status === 'incomplete' ? 'result.incompleteDescription' : 'result.balancedDescription') }}</p>
            <p v-if="allBalanced" class="mt-4 text-base/8 text-toned">{{ t('result.allBalanced') }}</p>
            <section v-else-if="result.candidates.length" class="mt-6">
              <h2 class="text-sm font-semibold">{{ t('result.candidatesTitle') }}</h2>
              <div class="mt-3 flex flex-wrap gap-2">
                <UButton v-for="code in result.candidates" :key="code" :to="`/personality-types#${code}`" color="neutral" variant="soft" :label="`${t(`personalities.${code}.name`)} · ${code}`" :aria-label="t('result.candidateLabel', { name: t(`personalities.${code}.name`), code })" />
              </div>
            </section>
          </UCard>
        </div>
        <section aria-labelledby="dimension-scores-heading" class="min-w-0">
          <h2 id="dimension-scores-heading" class="mb-4 text-xl font-semibold">{{ t('result.dimensionsTitle') }}</h2>
          <div class="space-y-4">
            <ResultDimension v-for="score in result.dimensions" :key="score.dimension.id" :score="score" />
          </div>
          <p class="mt-4 text-xs/6 text-muted">{{ t('result.scoreExplanation') }}</p>
        </section>
      </UPageGrid>

      <section v-if="completePoles.length" class="mt-10" aria-labelledby="personal-breakdown-heading">
        <h2 id="personal-breakdown-heading" class="text-2xl font-semibold">{{ t('result.personalBreakdown') }}</h2>
        <UPageGrid class="mt-5 gap-5 sm:grid-cols-2 lg:grid-cols-2">
          <UPageCard v-for="pole in completePoles" :key="pole" :title="`${pole} · ${t(`poles.${pole}.label`)}`" :description="t(`preferencePractice.${pole}`)" variant="naked" :ui="{ description: 'text-base/8', title: 'text-lg text-primary' }" />
        </UPageGrid>
      </section>

      <div v-if="copyFailed" class="mt-7 max-w-3xl">
        <p role="status" class="mb-2 text-sm text-muted">{{ t('result.copyFailed') }}</p>
        <UInput ref="linkInput" :model-value="shareUrl" readonly :aria-label="t('result.linkLabel')" class="w-full" size="lg" @focus="linkInput?.inputRef?.select()" />
      </div>
      <p class="mt-4 text-xs/6 text-muted">{{ t('result.shareDescription') }}</p>

      <UCollapsible v-model:open="showAnswers" class="mt-8">
        <UButton color="neutral" variant="link" :label="t('result.viewAnswers')" :trailing-icon="showAnswers ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'" class="px-0" />
        <template #content>
          <ol v-if="link.status === 'valid'" class="mt-4 max-w-3xl divide-y divide-default">
            <li v-for="(question, index) in questions" :key="question.id" class="py-4">
              <p class="text-sm/7">{{ index + 1 }}. {{ t(`${legacy ? 'legacyQuestions' : 'questions'}.${question.id}`) }}</p>
              <p class="mt-1 text-sm font-medium text-primary">{{ link.answers[index] === 'x' ? t('result.legacyUnknown') : legacy && link.answers[index] === 3 ? t('result.legacyNeutral') : t(`test.answers.${link.answers[index]}`) }}</p>
            </li>
          </ol>
        </template>
      </UCollapsible>
      <p class="mt-6 text-xs/6 text-muted">{{ t('result.limitation') }}</p>
      <p class="mt-2 text-xs/6 text-muted">{{ t('result.version', { content: link.status === 'valid' ? link.version : questionnaireVersion, scoring: scoringVersion }) }}</p>
    </div>
  </UContainer>
  </div>
</template>
