<script setup lang="ts">
import type { NuxtError } from '#app'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ error: NuxtError }>()
const { t } = useI18n({ useScope: 'global' })
const { uiLocale } = useAppLocale()
const isNotFound = computed(() => props.error.statusCode === 404)
useLocalizedHead()

function returnHome() {
  clearError({ redirect: '/' })
}

useSeoMeta({
  title: () => t(isNotFound.value ? 'error.notFoundPageTitle' : 'error.unavailablePageTitle'),
  robots: 'noindex, nofollow',
})
</script>

<template>
  <UApp :locale="uiLocale">
    <UContainer class="flex min-h-screen items-center justify-center py-12">
      <UEmpty
        :as="{ root: 'main', title: 'h1' }"
        :icon="isNotFound ? 'i-lucide-file-question' : 'i-lucide-circle-alert'"
        :title="t(isNotFound ? 'error.notFoundTitle' : 'error.unavailableTitle')"
        :description="t(isNotFound ? 'error.notFoundDescription' : 'error.unavailableDescription')"
        variant="naked"
        size="xl"
        :actions="[{ label: t('common.backHome'), onClick: returnHome, icon: 'i-lucide-arrow-left' }]"
      />
    </UContainer>
  </UApp>
</template>
