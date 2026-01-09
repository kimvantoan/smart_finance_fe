import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enCommon from '@/shared/locales/en/common.json'
import viCommon from '@/shared/locales/vi/common.json'
import enAuth from '@/shared/locales/en/auth.json'
import viAuth from '@/shared/locales/vi/auth.json'

i18n
  .use(LanguageDetector) // detect browser language
  .use(initReactI18next)
  .init({
    fallbackLng: 'vi',
    lng: 'vi',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        common: enCommon,
        auth: enAuth,
      },
      vi: {
        common: viCommon,
        auth: viAuth,
      },
    },
  })

export default i18n
