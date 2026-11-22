import en from './en.json'
import zhCN from './zh-CN.json'

export const messages = { 'zh-CN': zhCN, en }
export type AppLocale = keyof typeof messages
export type MessageSchema = typeof zhCN

export const defaultLocale: AppLocale = 'zh-CN'
export const localeCookieName = 'bugti-locale'

export const localeOptions: ReadonlyArray<{ value: AppLocale }> = (Object.keys(messages) as AppLocale[])
  .sort((left, right) => {
    if (left === 'en') return right === 'en' ? 0 : -1
    if (right === 'en') return 1
    return left.localeCompare(right)
  })
  .map(value => ({ value }))

export function isAppLocale(value: unknown): value is AppLocale {
  return typeof value === 'string' && Object.hasOwn(messages, value)
}

export function resolveLocale(value: unknown): AppLocale {
  return isAppLocale(value) ? value : defaultLocale
}

export function resolveBrowserLocale(browserLocales: readonly string[]): AppLocale {
  for (const browserLocale of browserLocales) {
    const normalizedLocale = browserLocale.toLowerCase()
    const exactLocale = localeOptions.find(option => option.value.toLowerCase() === normalizedLocale)
    if (exactLocale) return exactLocale.value

    const languageCode = normalizedLocale.split('-', 1)[0]
    const matchingLocale = localeOptions.find(option => option.value.toLowerCase().split('-', 1)[0] === languageCode)
    if (matchingLocale) return matchingLocale.value
  }

  return defaultLocale
}
