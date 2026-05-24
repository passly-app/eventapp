export function decode<T>(token: string): T {
  try {
    const payload = token.split('.')[1];

    if (!payload) {
      throw new Error();
    }

    const normalizedPayload = payload
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const decodedPayload =
      typeof globalThis.atob === 'function'
        ? globalThis.atob(normalizedPayload)
        : Buffer.from(normalizedPayload, 'base64').toString('utf-8');

    return JSON.parse(decodedPayload) as T;
  } catch {
    throw new Error('Invalid token');
  }
}