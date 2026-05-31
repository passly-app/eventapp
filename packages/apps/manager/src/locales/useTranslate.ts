import { useTranslation, type InferTranslations } from '@eventapp/resources';

import { locales } from './locales';

export type ManagerLocales = InferTranslations<typeof locales>;

/**
 * Hook de tradução tipado para o app `manager`. Injeta o shape das
 * traduções (inferido de `createLocales`) no `useTranslation` compartilhado,
 * de modo que o `t` autocompleta as chaves deste projeto.
 */
export const useTranslate = () => useTranslation<ManagerLocales>();
