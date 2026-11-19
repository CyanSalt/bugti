<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
useSeoMeta({ title: () => t('test.pageTitle'), robots: 'noindex, nofollow' })
</script>

<template>
  <UContainer class="flex min-h-[65vh] items-center justify-center py-14 sm:py-20">
    <UEmpty
      :as="{ root: 'section', title: 'h1' }"
      icon="i-lucide-construction"
      :title="t('test.title')"
      :description="t('test.description')"
      variant="naked"
      size="xl"
      :ui="{ header: 'max-w-md', title: 'text-2xl sm:text-3xl font-bold', description: 'mt-2 leading-7' }"
      :actions="[
        { label: t('common.exploreDimensions'), to: '/#dimensions', trailingIcon: 'i-lucide-arrow-right' },
        { label: t('common.backHome'), to: '/', color: 'neutral', variant: 'outline' },
      ]"
    />
  </UContainer>
</template>
