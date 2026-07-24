import { useForm } from '@iziui/react/lab/Form';

import type { Event } from '@eventapp/modules/event';

export default function useTicketForm(
  ticket: Event['tickets'][number],
  onChange: (value: Event['tickets'][number]) => void
) {
  return useForm<Event['tickets'][number]>({
    form: {
      id: { defaultValue: ticket.id },
      name: { defaultValue: ticket.name },
      description: { defaultValue: ticket.description },
      free: { defaultValue: ticket.free },
      count: { defaultValue: ticket.count },
      value: { defaultValue: ticket.value },
      limits: {
        defaultValue: ticket.limits,
        validators: [

        ]
      },
      schedule: {
        defaultValue: ticket.schedule
      }
    },
    handle: {
      change: ({ isValid, values }) => {
        if (!isValid) { return; }

        onChange(values);
      }
    },
    validator: {
      name: ({ values }) => {
        const { name } = values;

        if (!name) { return 'Este é um campo obrigatório'; }

        return;
      },
      value: ({ values }) => {
        const { value, free } = values;

        if (!free && !value) { return 'Este é um campo obrigatório'; }

        return;
      },
      limits: ({ values }) => {
        const { max, min } = values.limits;

        if (min < 0) { return 'O limite mínimo não pode ser negativo'; }
        if (max < 0) { return 'O limite máximo não pode ser negativo'; }
        if (min > max) { return 'O limite mínimo não pode ser maior que o limite máximo'; }

        return;
      }
    }
  }, []);
}