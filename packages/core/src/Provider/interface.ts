import type { PropsWithChildren } from 'react';

export type Component = (props: PropsWithChildren<any>) => React.JSX.Element;

export type ProviderData<
  F extends Component,
> = [provider: F, props?: Omit<React.ComponentProps<F>, 'children'>];