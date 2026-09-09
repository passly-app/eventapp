import { useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

import Stack from '@iziui/react/Stack';
import Divider from '@iziui/react/Divider';
import { useMenu } from '@iziui/react/Menu';
import { useModal } from '@iziui/react/Modal';
import { Card, CardContent } from '@iziui/react/Card';

import { useEvent, type Event } from '@eventapp/modules/event';

import InfoSlot from './InfoSlot';
import ActionSlot from './ActionSlot';
import EventCardHeader from './EventCardHeader';
import { EventCardMenu } from './EventCardMenu';
import DeleteEventModal from '../DeleteEventModal';

import './EventCard.scss';

interface EventCardProps {
  event: Event;
}

export default function EventCard({
  event,
}: EventCardProps) {
  const navigate = useNavigate();

  const [open, el, toggle] = useMenu();
  const [openModal, toggleModal] = useModal();

  const { updateEvent, copyEvent } = useEvent();

  const [loading, setLoading] = useState(false);

  const goToEdit = () => {
    navigate(
      generatePath('/editar-evento/:eventId', { eventId: event.id })
    );
  };

  const handleDelete = () => {
    setLoading(true);
    toggleModal();
  };

  const handleChangeStatus = (status: Event['status']) => {
    setLoading(true);
    updateEvent({ ...event, status })
      .finally(() => setLoading(false));
  };

  const handleDuplicate = () => {
    setLoading(true);
    copyEvent(event)
      .finally(() => setLoading(false));
  };

  return (
    <Card className="event-card">
      <EventCardHeader
        event={event}
        open={open}
        toggle={toggle}
      />

      <CardContent style={{ height: '100%' }}>
        <Stack gap={8} justifyContent="space-between" style={{ height: '100%' }}>
          <InfoSlot {...event} />
          <Divider />
          <ActionSlot goToEvent={goToEdit} />
        </Stack>
      </CardContent>

      <EventCardMenu
        el={el}
        open={open}
        event={event}
        loading={loading}
        onToggle={toggle}
        onDelete={handleDelete}
        onDuplicate={handleDuplicate}
        onChangeStatus={handleChangeStatus}
      />

      <DeleteEventModal
        event={event}
        isOpen={openModal}
        onToggle={toggleModal}
      />
    </Card>
  );
}