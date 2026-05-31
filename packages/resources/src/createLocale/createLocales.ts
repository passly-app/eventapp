import type { UnionToIntersection } from "./types";

type LocaleDefinition = Record<string, Record<string, unknown>>;

export function createLocales<T extends LocaleDefinition[]>(...args: T) {
  const result = args.reduce((acc, locale) => {
    const [language, translations] = Object.entries(locale)[0];

    acc[language] = { translations };

    return acc;
  }, {} as Record<string, { translations: unknown }>);

  return result as {
    [K in keyof UnionToIntersection<T[number]>]: {
      translations: UnionToIntersection<T[number]>[K];
    };
  };
}
