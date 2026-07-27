import { useState } from 'react';

import Icon from '@iziui/react/Icon';
import Stack from '@iziui/react/Stack';
import Button from '@iziui/react/Button';
import Typography from '@iziui/react/Typography';
import { Modal, ModalFooter, useModal } from '@iziui/react/Modal';
import Slide from '@iziui/react/animations/Slide';

import { uuid } from '@eventapp/toolkit/uuid';

import type { Event } from '@eventapp/modules/event';

import EventTicketList from './components/EventTicketList';
import EventTicketForm from './components/EventTicketForm';
import EventTicketCapability from './components/EventTicketCapability';
import { useEventForm } from '../../components/EventForm';

function getNewTicket(): Event['tickets'][number] {
  return {
    id: uuid(),
    name: '',
    description: '',
    free: true,
    count: 0,
    value: 0,
    limits: { min: 0, max: 0 },
    schedule: {
      startDate: new Date(),
      endDate: new Date(),
    }
  };
};

export default function EventTickets() {
  const [isOpen, toggleModal] = useModal();

  const { formGroup } = useEventForm();

  const [eventId, setEventId] = useState<string>();

  const handleModal = (id: string) => {
    setEventId(id);
    toggleModal();
  };

  const handleAddTicket = () => {
    formGroup.setValues((prev) => {
      const currentTickets = prev.tickets ?? [];
      prev.tickets = [...currentTickets, getNewTicket()];

      return prev;
    });
  };

  const updateTicket = (
    index: number,
    value: Event['tickets'][number],
  ) => {
    formGroup.setValues((prev) => {
      if (!prev.tickets) { return prev; }

      prev.tickets[index] = value;

      return prev;
    });
  };

  const deleteTicket = () => {
    formGroup.setValues((prev) => {
      if (!prev.tickets) { return prev; }

      prev.tickets = prev.tickets?.filter(t => t.id !== eventId);

      return prev;
    });

    toggleModal();
  };

  const cloneTicket = (id: string) => {
    const _id = uuid();

    formGroup.setValues(prev => {
      if (!prev.tickets) { return prev; }

      const picked = prev.tickets.find(t => t.id === id);

      if (!picked) { return prev; }

      prev.tickets = [...prev.tickets, { ...picked, id: _id }];

      return prev;
    });
  };

  return (
    <Slide enter>
      <Stack>
        <EventTicketCapability
          value={formGroup.values.capacity}
          error={formGroup.controls.capacity?.isInvalid}
          helperText={formGroup.controls.capacity?.error}
          onChange={(value) => {
            formGroup.setValues({ capacity: value });
          }}
        />
        <EventTicketList
          renderList={(ticket, index) => (
            <EventTicketForm
              index={index}
              ticket={ticket}
              onCopy={cloneTicket}
              onDelete={handleModal}
              onChange={(value) => updateTicket(index, value)}
            />
          )}
        />
        <Button
          fullWidth
          size="large"
          color="secondary"
          startIcon={<Icon name="plus" />}
          onClick={handleAddTicket}
          sx={{ boxShadow: 'sm' }}
        >
          Adicionar ingresso
        </Button>
        <Modal
          isOpen={isOpen}
          title={<Typography variant="h6">Atenção</Typography>}
          subtitle={
            <Typography variant="subtitle2" weight="normal">
              Tem certeza que deseja remover esse ingresso
            </Typography>
          }
          onClose={toggleModal}
        >
          <ModalFooter>
            <Button variant="text" color="grey" onClick={toggleModal}>
              Cancelar
            </Button>
            <Button variant="contained" color="error" onClick={deleteTicket}>
              Excluir
            </Button>
          </ModalFooter>
        </Modal>
      </Stack>
    </Slide>
  );
}
