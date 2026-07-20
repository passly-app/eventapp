
import Stack from '@iziui/react/Stack';
import Slide from '@iziui/react/animations/Slide';
import Typography from '@iziui/react/Typography';
import { Form } from '@iziui/react/lab/Form';

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

  return (
    <Stack>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">Ingressos</Typography>
        <Typography variant="body2" color="text.secondary">
          2 ingressos
        </Typography>
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