export type TLangs = 'ru-RU' | 'en-US' | 'uz-UZ';

export const DEFAULT_LANGUAGE: TLangs = 'ru-RU';

const LOCAL_STORAGE_LOCALE_KEY = 'locale';

export const getCurrentLocale = () => {
  return localStorage.getItem(LOCAL_STORAGE_LOCALE_KEY) as TLangs || DEFAULT_LANGUAGE;
};

export const setCurrentLocale = (value: TLangs) => {
  localStorage.setItem(LOCAL_STORAGE_LOCALE_KEY, value);
};
