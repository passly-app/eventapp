import type { Component, ProviderData } from './interface';

export function defineProvider<
  F extends Component
>(provider: ProviderData<F>) { return provider; }