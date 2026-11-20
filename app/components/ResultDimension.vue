<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { DimensionResult } from '~/utils/scoring'

const { score } = defineProps<{ score: DimensionResult }>()
const { t } = useI18n({ useScope: 'global' })
const { locale } = useAppLocale()
const format = (value: number) => new Intl.NumberFormat(locale.value, { maximumFractionDigits: 3 }).format(value)
</script>

<template>
  <UCard :ui="{ body: 'p-5 sm:p-6' }">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h3 class="flex items-center gap-2 font-semibold"><UIcon :name="score.dimension.icon" class="size-5 text-primary" />{{ t(`dimensions.${score.dimension.id}.title`) }}</h3>
      <UBadge color="neutral" variant="soft" :label="`${score.dimension.left.code} / ${score.dimension.right.code}`" />
    </div>
    <template v-if="score.status === 'complete'">
      <p class="mt-4 text-lg font-semibold text-highlighted">{{ score.pole ? t('result.leaning', { pole: t(`poles.${score.pole}.label`) }) : t('result.balanced') }}</p>
      <dl class="mt-5 grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt class="text-toned">{{ score.dimension.left.code }} · {{ t(`poles.${score.dimension.left.code}.label`) }}</dt>
          <dd class="mt-1 text-xl font-semibold text-primary">{{ t('result.points', { value: format(score.leftIndex) }) }}</dd>
        </div>
        <div class="text-end">
          <dt class="text-toned">{{ score.dimension.right.code }} · {{ t(`poles.${score.dimension.right.code}.label`) }}</dt>
          <dd class="mt-1 text-xl font-semibold text-primary">{{ t('result.points', { value: format(score.rightIndex) }) }}</dd>
        </div>
      </dl>
      <div class="relative mt-3">
        <UProgress :model-value="score.leftIndex" :max="100" size="sm" :aria-label="t('result.scoreAccessible', { left: t(`poles.${score.dimension.left.code}.label`), right: t(`poles.${score.dimension.right.code}.label`), leftScore: format(score.leftIndex), rightScore: format(score.rightIndex) })" />
        <span aria-hidden="true" class="pointer-events-none absolute top-0 left-1/2 h-full border-l border-default" />
      </div>
      <p v-if="score.pole && score.nearBoundary" class="mt-3 text-sm/6 text-muted">{{ t('result.nearBoundary') }} · {{ t('result.nearBoundaryHelp') }}</p>
      <p v-if="score.pattern" class="mt-3 text-sm/6 text-toned">{{ t(`result.pattern${score.pattern === 'both' ? 'Both' : score.pattern === 'neither' ? 'Neither' : 'Neutral'}`) }}</p>
      <p class="mt-3 text-xs/6 text-muted">{{ t('result.poleMeans', { left: score.dimension.left.code, right: score.dimension.right.code, leftMean: format(score.leftMean), rightMean: format(score.rightMean) }) }}</p>
    </template>
    <template v-else>
      <p class="mt-5 text-lg font-semibold">{{ t('result.incomplete') }}</p>
      <p class="mt-2 text-sm/6 text-muted">{{ t('result.answered', { count: score.answered }) }}</p>
    </template>
  </UCard>
</template>
