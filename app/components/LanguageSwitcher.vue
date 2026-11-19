<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { localeOptions } from '~/locales'

const { t } = useI18n({ useScope: 'global' })
const { locale, setLocale } = useAppLocale()
const items = computed(() => localeOptions.map(option => ({
  label: t('nativeName', {}, { locale: option.value }),
  icon: option.value === locale.value ? 'i-lucide-check' : undefined,
  onSelect: () => setLocale(option.value),
})))
</script>

<template>
  <UDropdownMenu :items="items" :content="{ align: 'end' }">
    <UButton
      icon="i-lucide-languages"
      color="neutral"
      variant="ghost"
      :aria-label="t('common.language')"
      :title="t('common.language')"
    />
  </UDropdownMenu>
</template>
