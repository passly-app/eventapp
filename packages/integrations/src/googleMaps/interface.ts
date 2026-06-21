/// <reference types="google.maps" />

export type LatLngLiteral = google.maps.LatLngLiteral;

export type GoogleMapsOptions = {
  /** Chave da API do Google Maps. */
  key: string;
  /** Idioma da interface e dos resultados (ex.: 'pt-BR'). */
  language?: string;
  /** Região de bias em código CLDR (ex.: 'BR'). */
  region?: string;
  /** Versão da Maps JS API. Default: 'weekly'. */
  version?: string;
};

export type AddressSuggestionsRequest = {
  /** Texto digitado pelo usuário. */
  input: string;
  /** Idioma dos resultados (sobrescreve o do construtor). */
  language?: string;
  /** Restringe os tipos retornados (ex.: ['geocode'], ['establishment']). */
  includedPrimaryTypes?: string[];
  /** Restringe os resultados a países em código CLDR (ex.: ['br']). */
  includedRegionCodes?: string[];
};

export type AddressSuggestion = {
  placeId: string;
  /** Texto completo da sugestão. */
  description: string;
  /** Parte principal (ex.: nome do local ou rua). */
  mainText: string;
  /** Parte secundária (ex.: cidade, estado). */
  secondaryText: string;
};

export type PlaceDetails = {
  placeId: string;
  name: string;
  formattedAddress: string;
  location: LatLngLiteral;
};

export type GeocodeResult = {
  placeId: string;
  formattedAddress: string;
  location: LatLngLiteral;
};

export type RenderMapOptions = {
  /** Posição inicial do mapa e do marcador. */
  center: LatLngLiteral;
  /** Nível de zoom inicial. Default: 15. */
  zoom?: number;
  /** Map ID necessário para o AdvancedMarkerElement. */
  mapId?: string;
};

export type MapMarker = {
  /** Move o marcador e centraliza o mapa na nova posição. */
  setPosition(location: LatLngLiteral): void;
  /** Remove o marcador do mapa. */
  remove(): void;
};

export type RenderedMap = {
  map: google.maps.Map;
  marker: MapMarker;
};
