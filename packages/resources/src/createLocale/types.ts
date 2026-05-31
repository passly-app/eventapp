/** Converte uma união (A | B) na interseção dos seus membros (A & B). */
export type UnionToIntersection<U> =
  (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void
    ? I
    : never;

/**
 * Extrai o shape das traduções a partir do retorno de `createLocales`.
 *
 * @example
 * const locales = createLocales(defineLocales('pt-BR', ptBr));
 * type ManagerLocales = InferTranslations<typeof locales>;
 */
export type InferTranslations<T> =
  T[keyof T] extends { translations: infer R } ? R : never;
