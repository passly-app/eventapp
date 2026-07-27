import Icon from '@iziui/react/Icon';
import Chip from '@iziui/react/Chip';
import Stack from '@iziui/react/Stack';
import Avatar from '@iziui/react/Avatar';
import Typography from '@iziui/react/Typography';

import { pluralize } from '@eventapp/toolkit/string';
import { maskCurrency } from '@eventapp/toolkit/mask';

import type { Event } from '@eventapp/modules/event';

interface ReviewTicketProps {
  ticket: Event['tickets'][number];
  index: number;
}

export default function ReviewTicket({ ticket, index }: ReviewTicketProps) {
  const labelCount = ticket.count
    ? pluralize(ticket.count, 'ingresso', 'ingressos')
    : 'Sem quantidade';

  return (
    <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
      <Stack flexDirection="row">
        <Avatar
          style={{
            border: 'none',
            background: '#F1F1F1'
          }}
          icon={<Icon name="ticket" color="primary" />}
        />
        <Stack gap={4}>
          <Typography variant="body1">
            {ticket.name || `Ingresso ${index + 1}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {labelCount}
          </Typography>
        </Stack>
      </Stack>
      <Chip
        color={ticket.free ? 'info' : 'success'}
        label={ticket.free ? 'Gratuito' : maskCurrency(ticket.value)}
      />
    </Stack>
  );
}
