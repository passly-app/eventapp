
import Stack from '@iziui/react/Stack';
import Slide from '@iziui/react/animations/Slide';
import Typography from '@iziui/react/Typography';
import { Form } from '@iziui/react/lab/Form';

import { pluralize } from '@eventapp/toolkit/string';

import type { Event } from '@eventapp/modules/event';

import { useEventForm } from '../../../../components/EventForm';

interface EventTicketListProps {
  renderList: (
    ticket: Event['tickets'][number],
    index: number
  ) => React.JSX.Element;
}

export default function EventTicketList({ renderList }: EventTicketListProps) {
  const { formGroup } = useEventForm();

  const count = formGroup.values.tickets?.length ?? 0;

  return (
    <Stack>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">Ingressos</Typography>
        {
          Boolean(count) && (
            <Typography variant="body2" color="text.secondary">
              {pluralize(count, 'ingresso', 'ingressos')}
            </Typography>
          )
        }
      </Stack>
      <Form formGroup={formGroup}>
        <Stack>
          {
            formGroup.values.tickets && formGroup.values.tickets.map((ticket, index) => (
              <Slide enter key={ticket.id}>
                {renderList(ticket, index)}
              </Slide>
            ))
          }
        </Stack>
      </Form>
    </Stack>
  );
}