import enIcon from '@/assets/icons/flags/en.svg?raw';
import ruIcon from '@/assets/icons/flags/ru.svg?raw';
import uzIcon from '@/assets/icons/flags/uz.svg?raw';

export type TLangs = 'ru-RU' | 'en-US' | 'uz-UZ';
export const DEFAULT_LANGUAGE: TLangs = 'ru-RU';

const LOCAL_STORAGE_LOCALE_KEY = 'locale';

export const getCurrentLocale = () => {
  return localStorage.getItem(LOCAL_STORAGE_LOCALE_KEY) as TLangs || DEFAULT_LANGUAGE;
};

export const setCurrentLocale = (value: TLangs) => {
  localStorage.setItem(LOCAL_STORAGE_LOCALE_KEY, value);
  document.documentElement.lang = value;
};

export const flagIcons: Record<TLangs, string> = {
  'en-US': enIcon,
  'ru-RU': ruIcon,
  'uz-UZ': uzIcon,
};

export const langNames: Record<TLangs, string> = {
  'en-US': 'Eng',
  'ru-RU': 'Рус',
  'uz-UZ': 'O‘z',
};
