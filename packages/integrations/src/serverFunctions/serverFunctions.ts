import type { HttpsCallable, HttpsCallableResult } from 'firebase/functions';

export default class ServerFunctions<
  Functions extends Record<string, HttpsCallable<any, any>>
> {
  constructor(private functions: Functions) { }

  async getFunction<K extends keyof Functions>(
    key: K,
    params: Parameters<Functions[K]>[0]
  ): Promise<ReturnType<Functions[K]> extends Promise<HttpsCallableResult<infer R>> ? R : never> {
    return this.functions[key](params)
      .then(res => res.data);
  }
}