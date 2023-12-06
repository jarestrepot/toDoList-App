import { createI18n } from 'vue-i18n'
import { diccionary } from "./diccionary";


export const i18n = new createI18n({
  messages: diccionary,
  fallbackFormat: 'en',
  locale: navigator.language.startsWith('en') ? 'en' : 'es'
});