import en from './en.json';

export const languages = { en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

const dictionaries: Record<Lang, Record<string, string>> = { en };

export function t(lang: Lang, key: string): string {
  return dictionaries[lang]?.[key] ?? dictionaries[defaultLang][key] ?? key;
}

/** Path prefix for a language ('' for the default language). */
export function langPrefix(lang: Lang): string {
  return lang === defaultLang ? '' : `/${lang}`;
}

export const htmlLang: Record<Lang, string> = { en: 'en-GB' };
export const ogLocale: Record<Lang, string> = { en: 'en_GB' };
