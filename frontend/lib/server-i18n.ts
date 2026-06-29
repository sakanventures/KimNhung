import { en } from './translations/en'
import { vi } from './translations/vi'

export function getT(locale: string) {
  return locale === 'vi' ? vi : en
}
