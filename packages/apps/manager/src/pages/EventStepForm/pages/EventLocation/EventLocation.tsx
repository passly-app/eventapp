import { useState } from 'react';

import Stack from '@iziui/react/Stack';
import Icon from '@iziui/react/Icon';
import Typography from '@iziui/react/Typography';
import Slide from '@iziui/react/animations/Slide';
import { Card, CardContent } from '@iziui/react/Card';
import { Autocomplete, AutocompleteButton } from '@iziui/react/Autocomplete';

import type { AddressSuggestion } from '@eventapp/integrations/googleMaps';

import { googleMaps } from '@/services/core';

import { useEventForm } from '../../components/EventForm';

export default function EventLocation() {
  const { formGroup } = useEventForm();

  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);

  const handleSearch = async (value: string) => {
    setLoading(true);
    const suggestions = await googleMaps.getAddressSuggestions({
      input: value,
      includedRegionCodes: ['br'],
    });

    setLoading(false);
    setSuggestions(suggestions);
  };

  const handleChange = async (address?: AddressSuggestion) => {
    if (!address) { return; }

    const {
      name,
      placeId,
      location,
      formattedAddress,
    } = await googleMaps.getPlaceDetails(address.placeId);

    formGroup.setValues({
      address: {
        name,
        id: placeId,
        description: formattedAddress,
        lat: location.lat,
        lon: location.lng,
      }
    });
  };

  return (
    <Slide enter style={{ height: '100%' }}>
      <Card fullWidth>
        <CardContent>
          <Stack>
            <Stack gap={0}>
              <Typography weight="bold">Onde?</Typography>
              <Typography variant="body2" color="text.secondary">
                Onde seu evento vai acontecer?
              </Typography>
            </Stack>
            <Autocomplete
              debounceTime={500}
              label="Informe o endereço ou nome do local do evento"
              placeholder="Endereço"
              startIcon={<Icon name="search" color="grey" />}
              options={suggestions}
              loading={loading}
              emptyContent={
                <Typography color="grey.main" variant="body2" textAlign="center">
                  Nenhum local encontrado
                </Typography>
              }
              onSearch={handleSearch}
              onChange={handleChange}
              renderOption={(option) => (
                <AutocompleteButton
                  value={option}
                  startIcon={<Icon name="map-marker" color="grey" />}
                  key={option.placeId}
                >
                  {option.description}
                </AutocompleteButton>
              )}
            />
          </Stack>
        </CardContent>
      </Card>
    </Slide>
  );
}
