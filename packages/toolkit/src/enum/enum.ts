export type Enum = Record<string, string | number>;

export function byEnum<E extends Enum>(e: E, key: keyof E) {
  return e[key];
};

export function toEnum<
  E extends Enum,
  K extends keyof E,
  V extends E[K]
>(e: E, value: V) {
  return e[value as keyof E];
};