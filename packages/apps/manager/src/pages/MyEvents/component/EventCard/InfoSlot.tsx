import Icon from '@iziui/react/Icon';
import Stack from '@iziui/react/Stack';
import Typography from '@iziui/react/Typography';

import { formatDate } from '@eventapp/toolkit/date';

import type { Event } from '@eventapp/modules/event';

export default function InfoSlot(event: Event) {
  const formatterDate = formatDate(event.schedule.startDate, {
    locale: 'pt-BR',
    options: {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'short',
    }
  });

  return (
    <>
      <Stack gap={4}>
        <Typography variant="subtitle1">
          {event.name}
        </Typography>
        <Typography variant="subtitle1">{event.description || '-'}</Typography>
      </Stack>
      <Stack gap={4}>
        <Stack flexDirection="revert" gap={8}>
          <Icon name="schedule" color="grey" />
          <Typography color="text.secondary">
            {formatterDate}
          </Typography>
        </Stack>
        <Stack flexDirection="revert" gap={8}>
          <Icon name="map-marker" color="grey" />
          <Typography color="text.secondary">
            {event.address.description ?? '-'}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}