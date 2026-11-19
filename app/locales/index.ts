import en from './en.json'
import zhCN from './zh-CN.json'

export const messages = { 'zh-CN': zhCN, en }
export type AppLocale = keyof typeof messages
export type MessageSchema = typeof zhCN

export const defaultLocale: AppLocale = 'zh-CN'
export const localeCookieName = 'bugti-locale'

export const localeOptions: ReadonlyArray<{ value: AppLocale }> = [
  { value: 'zh-CN' },
  { value: 'en' },
]

export function isAppLocale(value: unknown): value is AppLocale {
  return typeof value === 'string' && Object.hasOwn(messages, value)
}

export function resolveLocale(value: unknown): AppLocale {
  return isAppLocale(value) ? value : defaultLocale
}
