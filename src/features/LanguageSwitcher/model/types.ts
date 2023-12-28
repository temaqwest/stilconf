export const LanguagesList = {
    RU: 'ru',
    EN: 'en'
} as const

export type Languages =  (typeof LanguagesList)[keyof typeof LanguagesList];
