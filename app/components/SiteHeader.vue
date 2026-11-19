<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <UHeader :ui="{ root: 'bg-default', container: 'gap-2' }">
    <template #left>
      <NuxtLink to="/" :aria-label="t('common.homeLabel')" class="flex shrink-0 items-center gap-2.5 text-highlighted">
        <UIcon name="i-lucide-bug" class="size-7 text-primary" />
        <span class="text-xl font-extrabold tracking-tight">BUGTI</span>
      </NuxtLink>
    </template>

    <template #right>
      <UButton to="/personality-types" :label="t('common.personalityTypes')" color="neutral" variant="ghost" class="hidden sm:inline-flex" />
      <UButton to="/#dimensions" :label="t('common.dimensions')" color="neutral" variant="ghost" class="hidden lg:inline-flex" />
      <UButton to="/about" :label="t('common.about')" color="neutral" variant="ghost" />
      <LanguageSwitcher />
      <UColorModeButton />
    </template>

    <template #body>
      <div class="flex flex-col gap-2">
        <UButton to="/" :label="t('common.home')" color="neutral" variant="ghost" block />
        <UButton to="/personality-types" :label="t('common.personalityTypes')" color="neutral" variant="ghost" block />
        <UButton to="/#dimensions" :label="t('common.dimensions')" color="neutral" variant="ghost" block />
        <UButton to="/about" :label="t('common.aboutBugti')" color="neutral" variant="ghost" block />
      </div>
    </template>
  </UHeader>
</template>
