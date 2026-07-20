import Icon from '@iziui/react/Icon';
import Stack from '@iziui/react/Stack';;
import Avatar from '@iziui/react/Avatar';
import Typography from '@iziui/react/Typography';

import { pluralize } from '@eventapp/toolkit/string';

import type { Event } from '@eventapp/modules/event';

interface EventTicketFormHeaderProps {
  ticket: Event['tickets'][number];
  index: number;
}

export default function EventTicketFormHeader({ ticket, index }: EventTicketFormHeaderProps) {
  const label = ticket.free ? 'Gratuito' : 'Pago';
  const labelCount = ticket.count
    ? pluralize(ticket.count, 'ingresso', 'ingressos')
    : 'Sem quantidade';

  return (
    <Stack flexDirection="row">
      <Avatar
        style={{
          border: 'none',
          background: '#F1F1F1'
        }}
        icon={<Icon name="ticket" color="primary" />}
      />
      <Stack gap={4}>
        <Typography fullWidth variant="body1">
          Ingresso {index + 1}
        </Typography>
        <Stack flexDirection="row" gap={8}>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ·
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {labelCount}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}