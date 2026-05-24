import { ProviderData } from './interface';

export function createProvider(providers: ProviderData<any>[]) {
  return ({ children }: { children: React.ReactNode }) => {
    return providers.reduceRight((acc, [Provider, props]) => {
      return (
        <Provider {...props}>
          {acc}
        </Provider>
      );
    }, children);
  };
}