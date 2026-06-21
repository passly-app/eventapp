/// <reference types="google.maps" />
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

import type {
  LatLngLiteral,
  MapMarker,
  RenderedMap,
  GeocodeResult,
  PlaceDetails,
  RenderMapOptions,
  GoogleMapsOptions,
  AddressSuggestion,
  AddressSuggestionsRequest,
} from './interface';

export default class GoogleMaps {
  /** Token que agrupa as chamadas de autocomplete + fetchFields numa mesma sessão de billing. */
  private sessionToken?: google.maps.places.AutocompleteSessionToken;

  /** Predições da última busca, indexadas por placeId, para reaproveitar o session token no fetchFields. */
  private predictions = new Map<string, google.maps.places.PlacePrediction>();

  constructor({ key, language, region, version = 'weekly' }: GoogleMapsOptions) {
    setOptions({ key, language, region, v: version });
  }

  /**
   * Place Autocomplete — retorna sugestões de endereços/locais conforme o usuário digita.
   *
   * Mantém um session token interno para que esta busca e o `getPlaceDetails`
   * seguinte sejam cobrados como uma única sessão.
   */
  public async getAddressSuggestions({
    input,
    language,
    includedPrimaryTypes,
    includedRegionCodes,
  }: AddressSuggestionsRequest): Promise<AddressSuggestion[]> {
    if (!input.trim()) return [];

    const { AutocompleteSuggestion, AutocompleteSessionToken } = await importLibrary('places');

    if (!this.sessionToken) {
      this.sessionToken = new AutocompleteSessionToken();
    }

    const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions({
      input,
      language,
      includedPrimaryTypes,
      includedRegionCodes,
      sessionToken: this.sessionToken,
    });

    this.predictions.clear();

    return suggestions
      .map(({ placePrediction }) => placePrediction)
      .filter((prediction): prediction is google.maps.places.PlacePrediction => prediction !== null)
      .map((prediction) => {
        this.predictions.set(prediction.placeId, prediction);

        return {
          placeId: prediction.placeId,
          description: prediction.text.text,
          mainText: prediction.mainText?.text ?? prediction.text.text,
          secondaryText: prediction.secondaryText?.text ?? '',
        };
      });
  }

  /**
   * Detalhes de uma sugestão (coordenadas, endereço formatado, nome).
   *
   * Encerra a sessão de autocomplete iniciada em `getAddressSuggestions`.
   */
  public async getPlaceDetails(placeId: string): Promise<PlaceDetails> {
    const { Place } = await importLibrary('places');

    const prediction = this.predictions.get(placeId);
    const place = prediction ? prediction.toPlace() : new Place({ id: placeId });

    await place.fetchFields({
      fields: ['displayName', 'formattedAddress', 'location'],
    });

    // Sessão encerrada: limpa o token e as predições para a próxima busca.
    this.sessionToken = undefined;
    this.predictions.clear();

    return {
      placeId,
      name: place.displayName ?? '',
      formattedAddress: place.formattedAddress ?? '',
      location: place.location?.toJSON() ?? { lat: 0, lng: 0 },
    };
  }

  /** Geocoding — converte um endereço em coordenadas. */
  public async geocode(address: string): Promise<GeocodeResult[]> {
    const { Geocoder } = await importLibrary('geocoding');

    const { results } = await new Geocoder().geocode({ address });

    return results.map(toGeocodeResult);
  }

  /** Reverse Geocoding — converte coordenadas em endereços. */
  public async reverseGeocode(location: LatLngLiteral): Promise<GeocodeResult[]> {
    const { Geocoder } = await importLibrary('geocoding');

    const { results } = await new Geocoder().geocode({ location });

    return results.map(toGeocodeResult);
  }

  /**
   * Renderiza um mapa no elemento informado com um marcador na posição inicial.
   *
   * `mapId` é necessário para o `AdvancedMarkerElement`; sem ele o Google emite um aviso.
   */
  public async renderMap(
    container: HTMLElement,
    { center, zoom = 15, mapId }: RenderMapOptions
  ): Promise<RenderedMap> {
    const [{ Map }, { AdvancedMarkerElement }] = await Promise.all([
      importLibrary('maps'),
      importLibrary('marker'),
    ]);

    const map = new Map(container, { center, zoom, mapId });
    const advancedMarker = new AdvancedMarkerElement({ map, position: center });

    const marker: MapMarker = {
      setPosition(location) {
        advancedMarker.position = location;
        map.setCenter(location);
      },
      remove() {
        advancedMarker.map = null;
      },
    };

    return { map, marker };
  }
}

function toGeocodeResult(result: google.maps.GeocoderResult): GeocodeResult {
  return {
    placeId: result.place_id,
    formattedAddress: result.formatted_address,
    location: result.geometry.location.toJSON(),
  };
}
