import { createLocales, defineLocales } from '@eventapp/resources/createLocale';

import * as ptBr from './ptBr';

export const locales = createLocales(
  defineLocales('pt-BR', ptBr),
);