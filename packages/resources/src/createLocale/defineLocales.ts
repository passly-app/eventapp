import type { Language } from "../context/config";

import type { UnionToIntersection } from "./types";

type LocaleModule = Record<string, object>;

export function defineLocales<L extends Language, M extends LocaleModule[]>(
  language: L,
  ...modules: M
) {
  const translations = modules.reduce(
    (acc, module) => ({
      ...acc,
      ...module,
    }),
    {}
  );

  return { [language]: translations } as Record<L, UnionToIntersection<M[number]>>;
}
