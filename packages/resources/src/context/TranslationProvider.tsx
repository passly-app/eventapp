import React from 'react';
import { I18nextProvider } from 'react-i18next';

import { II18n, init } from './config';

export interface IProps {
  children: React.ReactNode;
  locales: II18n;
}

export default function TranslateProvider({ children, locales }: IProps) {
  return (
    <I18nextProvider i18n={init(locales)}>
      {children}
    </I18nextProvider>
  );
}