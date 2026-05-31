import { useTranslation } from 'react-i18next';

import { Cookies } from '@eventapp/toolkit/dom'
import type { Path } from '@eventapp/toolkit/interface'

import { Language } from './config';

export default function useTranslate<T = Record<string, unknown>>() {
  const cookies = new Cookies<'i18n'>();
  const { t, i18n } = useTranslation();

  const translate = (key: Path<T>, options?: Record<string, unknown>) =>
    t(key as string, options);

  const changeLanguage = (language: Language) => {
    i18n.changeLanguage(language, () => cookies.set('i18n', language));
  };

  return { t: translate, changeLanguage, language: i18n.language as Language };
}
