<script setup lang="ts">
import type { Dimension } from '~/data/dimensions'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })

defineProps<{ dimension: Dimension }>()
</script>

<template>
  <UPageCard
    :id="`dimension-${dimension.id}`"
    :title="t(`dimensions.${dimension.id}.title`)"
    :description="t(`dimensions.${dimension.id}.question`)"
    :icon="dimension.icon"
    variant="outline"
    :ui="{ container: 'gap-5', title: 'text-lg' }"
  >
    <UPageGrid class="grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-2">
      <div v-for="pole in [dimension.left, dimension.right]" :key="pole.code" class="min-w-0">
        <div class="mb-2.5 flex flex-wrap items-center gap-2.5">
          <UBadge :label="pole.code" color="primary" variant="soft" size="lg" class="size-9 justify-center text-base font-bold" />
          <span class="font-semibold wrap-anywhere text-highlighted">{{ t(`poles.${pole.code}.label`) }}</span>
        </div>
        <p v-if="t(`poles.${pole.code}.label`) !== pole.word" class="mb-2 break-words text-xs text-muted">{{ pole.word }}</p>
        <p class="text-base/7 text-toned">{{ t(`poles.${pole.code}.description`) }}</p>
      </div>
    </UPageGrid>
  </UPageCard>
</template>
