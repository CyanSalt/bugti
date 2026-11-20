<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { isAnswer, isAnswerSet, questions, questionnaireVersion } from '~/data/questionnaire'
import { createResultPath, readResultQuery } from '~/utils/resultLink'
import { createMotionController } from '~/utils/motion'

const { t } = useI18n({ useScope: 'global' })
const { locale, setLocale } = useAppLocale()
const { draft, ready, storageAvailable, reset } = useQuestionnaireDraft()
const route = useRoute()
const answerError = ref(false)
const restoringError = ref(false)
const submitting = ref(false)
const autoAdvance = ref(false)
const questionHeading = useTemplateRef('questionHeading')
const reviewHeading = useTemplateRef('reviewHeading')
const questionBody = useTemplateRef('questionBody')
const motion = createMotionController(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
let stepRevision = 0
let advanceTimer: ReturnType<typeof setTimeout> | undefined
const advancing = ref(false)

const answered = computed(() => draft.value.answers.filter(isAnswer).length)
const question = computed(() => questions[draft.value.step])
const reviewing = computed(() => draft.value.step === questions.length)
const responseOptions = computed(() => [1, 2, 3, 4, 5].map(value => ({ label: t(`test.answers.${value}`), value: String(value) })))
const currentAnswer = computed({
  get: () => {
    const answer = draft.value.answers[draft.value.step]
    return typeof answer === 'number' ? String(answer) : ''
  },
  set: (value: string | undefined) => {
    const answer = Number(value)
    if (!isAnswer(answer) || !question.value) return
    draft.value.answers[draft.value.step] = answer
    answerError.value = false
    if (autoAdvance.value) {
      cancelAutoAdvance()
      const step = draft.value.step
      advancing.value = true
      advanceTimer = setTimeout(() => {
        if (draft.value.step === step && autoAdvance.value) goTo(step + 1)
        cancelAutoAdvance()
      }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 160)
    }
  },
})

function restoreLinkedAnswers() {
  if (!ready.value) return
  if (route.query.new === '1') {
    reset()
    void navigateTo('/test', { replace: true })
    return
  }
  if (Object.keys(route.query).length === 0) return
  const restored = readResultQuery(route.query)
  if (restored.status !== 'valid' || restored.version !== questionnaireVersion) {
    reset()
    restoringError.value = true
    void navigateTo('/test', { replace: true })
    return
  }
  restoringError.value = false
  draft.value.answers = [...restored.answers]
  draft.value.started = true
  draft.value.step = questions.length
  if (restored.locale) setLocale(restored.locale)
  void navigateTo('/test', { replace: true })
}

watch(ready, restoreLinkedAnswers)
watch(() => route.query, restoreLinkedAnswers)

function cancelAutoAdvance() {
  clearTimeout(advanceTimer)
  advanceTimer = undefined
  advancing.value = false
}

watch(autoAdvance, enabled => { if (!enabled) cancelAutoAdvance() })
watch(() => route.query, cancelAutoAdvance)

async function focusStep(direction = 1) {
  const revision = ++stepRevision
  motion.clear()
  await nextTick()
  if (revision !== stepRevision) return
  const heading = reviewing.value ? reviewHeading.value : questionHeading.value
  heading?.focus({ preventScroll: true })
  heading?.scrollIntoView({ block: 'nearest', behavior: 'instant' })
  motion.animate(heading, [
    { transform: `translateX(${direction * 10}px)` },
    { transform: 'translateX(0)' },
  ], { duration: 260, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' })
  const options = questionBody.value?.querySelectorAll<HTMLElement>('[data-slot="item"]') ?? []
  options.forEach((option, index) => {
    motion.animate(option, [
      { transform: `translateX(${direction * 6}px)` },
      { transform: 'translateX(0)' },
    ], { duration: 260, delay: 24 + index * 16, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' })
  })
}

function begin() {
  draft.value.started = true
  void focusStep()
}

function restart() {
  cancelAutoAdvance()
  stepRevision++
  motion.clear()
  reset()
  restoringError.value = false
  answerError.value = false
  autoAdvance.value = false
  if (Object.keys(route.query).length) void navigateTo('/test', { replace: true })
}

function goTo(step: number) {
  cancelAutoAdvance()
  const direction = step >= draft.value.step ? 1 : -1
  draft.value.step = Math.max(0, Math.min(questions.length, step))
  answerError.value = false
  void focusStep(direction)
}

function advance() {
  cancelAutoAdvance()
  if (!isAnswer(draft.value.answers[draft.value.step])) {
    answerError.value = true
    return
  }
  goTo(draft.value.step + 1)
}

async function finish() {
  if (!isAnswerSet(draft.value.answers) || submitting.value) return
  submitting.value = true
  try {
    await navigateTo(createResultPath(draft.value.answers, locale.value))
  }
  finally {
    submitting.value = false
  }
}

onBeforeUnmount(() => {
  stepRevision++
  cancelAutoAdvance()
  motion[Symbol.dispose]()
})
useSeoMeta({ title: () => t('test.pageTitle'), robots: 'noindex, nofollow' })
</script>

<template>
  <div>
  <UContainer class="py-10 sm:py-16">
    <div v-if="!ready" class="mx-auto max-w-2xl space-y-5" aria-busy="true">
      <USkeleton class="h-10 w-3/4" />
      <USkeleton class="h-64 w-full" />
    </div>

    <section v-else-if="!draft.started" class="mx-auto max-w-2xl">
      <UPageHeader :title="t('test.title')" :description="t('test.description')" :ui="{ root: 'border-0 pb-6', title: 'text-3xl sm:text-4xl', description: 'text-base/7' }" />
      <UCard :ui="{ body: 'space-y-6 sm:p-8' }">
        <h2 class="text-lg font-semibold">{{ t('test.instructionsTitle') }}</h2>
        <ul class="space-y-4 text-base/7 text-toned">
          <li v-for="key in ['instructionExperience', 'instructionChoice', 'instructionHonesty', 'instructionNeutral']" :key="key" class="flex gap-3">
            <UIcon name="i-lucide-check" class="mt-1 size-5 shrink-0 text-primary" />
            <span>{{ t(`test.${key}`) }}</span>
          </li>
        </ul>
        <UAlert v-if="restoringError" color="warning" variant="soft" :description="t('test.linkInvalid')" />
        <UButton size="xl" block trailing-icon="i-lucide-arrow-right" :label="t('test.begin')" @click="begin" />
      </UCard>
    </section>

    <section v-else class="mx-auto max-w-3xl">
      <div class="mb-8 space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-3 text-sm">
          <p class="font-medium text-highlighted">{{ t('test.progress', { answered, total: questions.length }) }}</p>
          <UButton color="neutral" variant="link" size="sm" :label="t('test.restart')" class="p-0" @click="restart" />
        </div>
        <UProgress :model-value="answered" :max="questions.length" size="sm" :aria-label="t('test.progressLabel')" :ui="{ indicator: 'duration-320 ease-[cubic-bezier(0.16,1,0.3,1)]' }" />
      </div>

      <div v-if="question && !reviewing" ref="questionBody" :data-advancing="advancing">
        <p class="mb-3 text-sm font-semibold text-primary">{{ t('test.questionNumber', { current: draft.step + 1, total: questions.length }) }}</p>
        <h1 id="question-heading" ref="questionHeading" tabindex="-1" class="min-h-28 text-2xl/9 font-semibold text-highlighted outline-none sm:min-h-24 sm:text-3xl/11">{{ t(`questions.${question.id}`) }}</h1>
        <form class="mt-7" @submit.prevent="advance">
          <URadioGroup
            :key="question.id"
            v-model="currentAnswer"
            :items="responseOptions"
            :name="question.id"
            aria-labelledby="question-heading"
            :aria-describedby="answerError ? 'answer-error' : undefined"
            variant="card"
            size="lg"
            highlight
            class="question-responses"
            :ui="{ fieldset: 'gap-3', item: 'min-h-14 cursor-pointer duration-160 has-data-[state=checked]:bg-primary/10 has-data-[state=checked]:[&_[data-slot=label]]:text-primary', label: 'text-base/6' }"
          />
          <p v-if="answerError" id="answer-error" role="alert" class="mt-4 text-sm text-error">{{ t('test.chooseAnswer') }}</p>
          <div v-if="answered === questions.length && draft.step < questions.length - 1" class="mt-5 flex justify-end">
            <UButton type="button" color="neutral" variant="link" :label="t('test.review')" @click="goTo(questions.length)" />
          </div>
          <div class="mt-8 flex items-end justify-between gap-4 sm:items-center">
            <UButton type="button" color="neutral" variant="outline" :disabled="draft.step === 0" icon="i-lucide-arrow-left" :label="t('test.previous')" size="lg" @click="goTo(draft.step - 1)" />
            <div class="flex flex-col items-end gap-3 sm:flex-row sm:items-center sm:gap-5">
              <USwitch v-model="autoAdvance" :label="t('test.autoNext')" size="sm" />
              <UButton type="submit" trailing-icon="i-lucide-arrow-right" :label="t(draft.step === questions.length - 1 ? 'test.review' : 'test.next')" size="lg" />
            </div>
          </div>
        </form>
      </div>

      <div v-else-if="reviewing">
        <h1 ref="reviewHeading" tabindex="-1" class="flex items-start gap-3 text-3xl font-semibold outline-none">
          <UIcon v-if="answered === questions.length" name="i-lucide-list-check" class="mt-1 size-8 shrink-0 text-primary" />
          <span>{{ answered === questions.length ? t('test.reviewCompleteTitle', { total: questions.length }) : t('test.reviewTitle') }}</span>
        </h1>
        <p class="mt-3 text-base/7 text-toned">{{ t('test.reviewDescription') }}</p>
        <div class="mt-6 flex flex-wrap justify-between gap-3">
          <UButton color="neutral" variant="outline" icon="i-lucide-arrow-left" :label="t('test.previous')" @click="goTo(questions.length - 1)" />
          <UButton size="lg" icon="i-lucide-sparkles" :loading="submitting" :disabled="answered !== questions.length" :label="t('test.viewResult')" @click="finish" />
        </div>
        <ol class="mt-8 divide-y divide-default">
          <li v-for="(item, index) in questions" :key="item.id" class="flex items-start gap-4 py-5">
            <span class="pt-0.5 text-sm font-semibold text-muted">{{ index + 1 }}</span>
            <div class="min-w-0 flex-1">
              <p class="text-base/7">{{ t(`questions.${item.id}`) }}</p>
              <p class="mt-2 text-sm font-medium text-primary">{{ isAnswer(draft.answers[index]) ? t(`test.answers.${draft.answers[index]}`) : t('test.unanswered') }}</p>
            </div>
            <UButton color="neutral" variant="ghost" icon="i-lucide-pencil" :aria-label="t('test.editAnswer', { number: index + 1 })" @click="goTo(index)" />
          </li>
        </ol>
      </div>

      <p class="mt-8 text-xs/6 text-muted">{{ t(storageAvailable ? 'test.resumeNotice' : 'test.storageUnavailable') }}</p>
    </section>
  </UContainer>
  </div>
</template>

<style scoped>
.question-responses :deep([data-slot="item"]:has([data-state="checked"]) [data-slot="indicator"]) {
  animation: response-confirm 180ms cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes response-confirm {
  from { transform: scale(0.65); }
  to { transform: scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .question-responses :deep([data-slot="indicator"]) {
    animation: none;
  }
}
</style>
