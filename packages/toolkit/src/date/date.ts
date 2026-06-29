type ItlOptions = {
  locale: Intl.LocalesArgument,
  options?: Intl.DateTimeFormatOptions
}

export function formatDate(date: Date, itl: ItlOptions = {
  locale: 'pt-BR',
}) {
  return new Intl.DateTimeFormat(itl.locale, itl.options).format(date);
}