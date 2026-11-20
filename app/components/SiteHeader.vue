<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
const route = useRoute()
const isHome = computed(() => route.path === '/')
const personalityLinks = computed(() => [
  { label: t('common.dimensions'), to: '/dimensions' },
  { label: t('common.personalityTypes'), to: '/personality-types' },
])
const mobileLinks = computed(() => [
  { label: t('common.home'), to: '/' },
  { label: t('common.personalityNavigation'), children: personalityLinks.value },
])
</script>

<template>
  <UHeader :ui="{ root: isHome ? 'bg-transparent border-transparent backdrop-blur-none' : 'bg-default', container: 'gap-2' }">
    <template #left>
      <ULink to="/" :aria-label="t('common.homeLabel')" class="flex shrink-0 items-center gap-2.5 text-highlighted">
        <UIcon name="i-lucide-bug" class="size-7 text-primary" />
        <span class="text-xl font-extrabold tracking-tight">BUGTI</span>
      </ULink>
    </template>

    <template #right>
      <UDropdownMenu :items="personalityLinks" :content="{ align: 'end' }">
        <UButton :label="t('common.personalityNavigation')" trailing-icon="i-lucide-chevron-down" color="neutral" variant="ghost" class="hidden sm:inline-flex" />
      </UDropdownMenu>
      <LanguageSwitcher />
      <UColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu :items="mobileLinks" orientation="vertical" class="w-full" />
    </template>
  </UHeader>
</template>
