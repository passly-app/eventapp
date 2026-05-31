import { initReactI18next } from 'react-i18next';
import i18n, { type InitOptions, type Resource } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { Cookies } from '@eventapp/toolkit/dom'

export type Language = 'pt-BR';

export type II18n = Resource;

export const init = (translations: II18n) => {
    const cookies = new Cookies<'i18n'>();
    const language = cookies.get<Language>('i18n');
    const i18nConfig: InitOptions = {
        fallbackLng: 'pt-BR',
        resources: translations,
        defaultNS: 'translations',
        lng: language
    };

    i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init(i18nConfig);

    cookies.set('i18n', i18n.language);

    return i18n;
};