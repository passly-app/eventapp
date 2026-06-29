import { useMemo, useState, type MouseEvent } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

import Box from '@iziui/react/Box';
import Chip from '@iziui/react/Chip';
import Icon from '@iziui/react/Icon';
import Stack from '@iziui/react/Stack';
import Divider from '@iziui/react/Divider';
import ButtonIcon from '@iziui/react/ButtonIcon';
import { Menu, MenuButton, useMenu } from '@iziui/react/Menu';
import { Card, CardContent } from '@iziui/react/Card';
import { getLinearGradient, joinClass } from '@iziui/react/core';
import type { Colors } from '@iziui/react/theme';

import { useEvent, type Event } from '@eventapp/modules/event';

import InfoSlot from './InfoSlot';
import StatusSlot from './StatusSlot';
import ActionSlot from './ActionSlot';

import './EventCard.scss';

interface EventCardProps {
  event: Event;
}

function mapLabel(
  status: Event['status']
) {
  const map: { [X in Event['status']]: string } = {
    draft: 'Rascunho',
    published: 'Publicado'
  };
  return map[status];
}

function statusMap(status: Event['status']) {
  const map: { [X in Event['status']]: Colors } = {
    draft: 'info',
    published: 'success'
  };
  return map[status];
}

export default function EventCard({
  event,
}: EventCardProps) {
  const navigate = useNavigate();

  const [open, el, toggle] = useMenu();

  const { deleteEvent } = useEvent();

  const [loading, setLoading] = useState(false);

  const headerClss = joinClass(
    'event-card__header',
    event.image && 'event-card__header--image'
  );

  const { label, color } = useMemo(() => ({
    color: statusMap(event.status),
    label: mapLabel(event.status)
  }), [event]);

  const handleMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    toggle(e);
  };

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
      <Box className={headerClss}
        sx={{ background: ({ primary }) => getLinearGradient(primary.main) }}
      >
        <Icon
          size={45}
          name="image-v"
          className="event-card__header__icon"
        />
        <Stack className="event-card__header__info" flexDirection="row" justifyContent="space-between">
          <Chip
            color={color}
            label={label}
            sx={{ color: (palette) => palette[color].light }}
            icon={
              <Box
                className="event-card__header__info__bullet"
                sx={{ backgroundColor: (palette) => palette[color].light }}
              />}
          />
          <ButtonIcon
            size={32}
            onClick={handleMenu}
            sx={{
              color: ({ text }) => text.secondary,
              backgroundColor: ({ background }) => background.default,
            }}
          >
            <Icon name={open ? 'times' : 'ellipsis-v'} />
          </ButtonIcon>
        </Stack>
      </Box>
      <CardContent>
        <Stack gap={8}>
          <InfoSlot {...event} />
          <Divider />
          <StatusSlot />
          <ActionSlot goToEvent={goToEdit} />
        </Stack>
      </CardContent>
      <Menu
        width="fit-content"
        direction="right"
        maxHeight="100%"
        open={open}
        anchorEl={el}
        onClose={toggle}
      >
        <MenuButton
          disabled={loading}
          label="Duplicar evento"
          icon={<Icon name="copy-alt" />}
        />
        <MenuButton
          disabled={loading}
          label="Tornar rascunho"
          icon={<Icon name="file" />}
        />
        <MenuButton
          disabled={loading}
          label="Desativar evento"
          icon={<Icon name="eye-slash" />}
        />
        <MenuButton
          disabled={loading}
          label="Copiar link"
          icon={<Icon name="link-h" />}
        />
        <MenuButton
          disabled={loading}
          color="error"
          label="Excluir evento"
          icon={<Icon name="trash" />}
          onClick={handleDelete}
        />
      </Menu>
    </Card>
  );
}