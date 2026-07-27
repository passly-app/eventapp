import { useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

import Stack from '@iziui/react/Stack';
import Divider from '@iziui/react/Divider';
import { useMenu } from '@iziui/react/Menu';
import { Card, CardContent } from '@iziui/react/Card';

import { useEvent, type Event } from '@eventapp/modules/event';

import InfoSlot from './InfoSlot';
import StatusSlot from './StatusSlot';
import ActionSlot from './ActionSlot';
import EventCardHeader from './EventCardHeader';
import { EventCardMenu } from './EventCardMenu';

import './EventCard.scss';

interface EventCardProps {
  event: Event;
}

export default function EventCard({
  event,
}: EventCardProps) {
  const navigate = useNavigate();

  const [open, el, toggle] = useMenu();

  const { deleteEvent } = useEvent();

  const [loading, setLoading] = useState(false);

  const goToEdit = () => {
    navigate(
      generatePath('/editar-evento/:eventId', { eventId: event.id })
    );
  };

  const handleDelete = () => {
    setLoading(true);
    deleteEvent(event.id)
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
          <StatusSlot />
          <ActionSlot goToEvent={goToEdit} />
        </Stack>
      </CardContent>

      <EventCardMenu
        el={el}
        open={open}
        event={event}
        toggle={toggle}
        loading={loading}
        handleDelete={handleDelete}
      />
    </Card>
  );
}