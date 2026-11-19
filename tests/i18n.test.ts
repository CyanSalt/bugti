import { createI18n } from 'vue-i18n'
import { describe, expect, it } from 'vitest'
import { readFileSync, globSync } from 'node:fs'
import { defaultLocale, isAppLocale, localeOptions, messages, resolveLocale } from '../app/locales'

function flattenMessages(value: object, prefix = ''): Record<string, string> {
  return Object.fromEntries(Object.entries(value).flatMap(([key, child]) => {
    const path = prefix ? `${prefix}.${key}` : key
    return typeof child === 'string'
      ? [[path, child]]
      : Object.entries(flattenMessages(child, path))
  }))
}

const chinese = flattenMessages(messages['zh-CN'])
const english = flattenMessages(messages.en)

describe('Localized messages', () => {
  it('has matching translation keys and non-empty values in both languages', () => {
    expect(Object.keys(english).sort()).toEqual(Object.keys(chinese).sort())
    for (const dictionary of [chinese, english]) {
      for (const value of Object.values(dictionary)) expect(value.trim()).not.toBe('')
    }
  })

  it('defines every static translation key referenced by pages', () => {
    const files = globSync('app/**/*.vue').concat(globSync('app/composables/*.ts'))
    for (const file of files) {
      const source = readFileSync(file, 'utf8')
      for (const match of source.matchAll(/\bt\('([^']+)'\)/g)) {
        expect(chinese[match[1]!], `${file}: ${match[1]}`).toBeTypeOf('string')
      }
    }
  })

  it('keeps source code and tests free of hardcoded Chinese text', () => {
    const files = globSync('app/**/*.{ts,vue,css}').concat(globSync('tests/**/*.ts'))
    for (const file of files) {
      expect(readFileSync(file, 'utf8'), file).not.toMatch(/\p{Script=Han}/u)
    }
  })

  it('resolves language menu labels in each language regardless of the active locale', () => {
    const i18n = createI18n({ legacy: false, locale: 'en', fallbackLocale: defaultLocale, messages })
    for (const option of localeOptions) {
      expect(i18n.global.t('nativeName', {}, { locale: option.value })).toBe(messages[option.value].nativeName)
    }
    i18n.global.locale.value = 'zh-CN'
    for (const option of localeOptions) {
      expect(i18n.global.t('nativeName', {}, { locale: option.value })).toBe(messages[option.value].nativeName)
    }
    i18n.dispose()
  })

  it('switches global messages immediately through vue-i18n', () => {
    const i18n = createI18n({ legacy: false, locale: defaultLocale, fallbackLocale: defaultLocale, messages })
    expect(i18n.global.t('common.home')).toBe(messages['zh-CN'].common.home)
    i18n.global.locale.value = 'en'
    expect(i18n.global.t('common.home')).toBe('Home')
    expect(i18n.global.t('poles.E.label')).toBe('Experimentation')
    i18n.dispose()
  })
})

describe('Locale validation', () => {
  it('preserves supported locales', () => {
    expect(resolveLocale('en')).toBe('en')
    expect(resolveLocale('zh-CN')).toBe('zh-CN')
  })

  it.each([undefined, null, '', 'fr', 'en-US', '__proto__', 'constructor', [], {}])('falls back to the default locale for unsupported or invalid value %j', (value) => {
    expect(isAppLocale(value)).toBe(false)
    expect(resolveLocale(value)).toBe(defaultLocale)
  })
})
