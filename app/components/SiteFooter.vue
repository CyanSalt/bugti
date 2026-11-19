<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <UFooter :ui="{ root: 'border-t border-default', container: 'gap-4' }">
    <template #left>
      <p class="text-sm text-muted">{{ t('common.siteTitle') }}</p>
    </template>
    <template #right>
      <p class="text-sm text-muted">{{ t('common.tagline') }}</p>
      <UButton to="/about" :label="t('common.learnTest')" color="neutral" variant="link" size="sm" />
    </template>
  </UFooter>
</template>
