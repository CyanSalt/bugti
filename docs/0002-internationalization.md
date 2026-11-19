# Internationalization

## Supported languages

The site uses the vue-i18n Composition API with Simplified Chinese (`zh-CN`) as the default and English (`en`) as an alternative. Locale changes preserve the current URL. Browser language is not used for automatic selection.

Page copy, dimension explanations, navigation, accessibility labels, SEO metadata, HTML `lang`, and Nuxt UI messages follow the selected locale.

## Implementation boundaries

- `app/locales/zh-CN.json` and `app/locales/en.json` contain translatable messages with matching keys.
- `app/locales/index.ts` registers dictionaries, language names, validation, and the default locale.
- `app/plugins/i18n.ts` creates an independent vue-i18n instance for each Nuxt app and SSR request.
- `app/composables/useAppLocale.ts` exposes the current locale, its Nuxt UI locale, and a validated setter.
- `app/composables/useLocalizedHead.ts` synchronizes document language and shared SEO metadata. Both `app.vue` and the independent error page use it.
- `app/components/LanguageSwitcher.vue` uses a Nuxt UI dropdown menu and displays language names in their own language.
- `@intlify/unplugin-vue-i18n` precompiles JSON messages during the build.

The selected language is stored in the `bugti-locale` cookie for one year, with path `/` and `SameSite=Lax`. The server-rendered page and client hydration use the same cookie value. Missing or unsupported values fall back to `zh-CN`.

Do not share mutable locale state across SSR requests or replace the server-visible cookie with client-only persistence.

## Translating components

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <UButton :label="t('common.home')" to="/" />
</template>
```

Use reactive getters for page metadata so it changes with the locale:

```ts
useSeoMeta({ title: () => t('about.pageTitle') })
```

Dimension identifiers, letter codes, and canonical English pole names remain stable in `app/data/dimensions.ts`. Translate display titles, labels, questions, and descriptions through `dimensions.*` and `poles.*` message keys. Avoid repeating an English label as a secondary canonical name when the two are identical.

## Adding a language

1. Add a dictionary in `app/locales/` with the same keys as the existing dictionaries.
2. Register it and its native language name in `app/locales/index.ts`.
3. Register the corresponding Nuxt UI language pack in `useAppLocale.ts`.
4. Verify translations, page metadata, language persistence, the independent error page, and narrow layouts.
5. Run the validation commands in the [development guide](0001-development-guide.md).

`tests/i18n.test.ts` checks matching dictionary keys, nonempty messages, static translation keys used by components, language validation, and basic vue-i18n switching. `tests/dimensions.test.ts` checks complete dimension messages in every registered language.

Both currently supported languages read left to right. Adding an RTL language also requires updating the document direction and checking directional layout and icons.
