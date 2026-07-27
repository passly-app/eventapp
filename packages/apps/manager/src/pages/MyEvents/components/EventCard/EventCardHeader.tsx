import { useMemo, type MouseEvent } from 'react';

import Box from '@iziui/react/Box';
import Chip from '@iziui/react/Chip';
import Icon from '@iziui/react/Icon';
import Stack from '@iziui/react/Stack';
import ButtonIcon from '@iziui/react/ButtonIcon';
import { getLinearGradient, joinClass } from '@iziui/react/core';
import { Colors } from '@iziui/react/theme';

import { type Event } from '@eventapp/modules/event';

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

interface EventCardHeaderProps {
  event: Event;
  open: boolean;
  toggle: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function EventCardHeader({
  event,
  open,
  toggle
}: EventCardHeaderProps) {
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

  return (
    <Box className={headerClss}
      sx={{ background: ({ secondary }) => getLinearGradient(secondary.main) }}
    >
      {
        event.image && <img src={event.image} loading="lazy" alt="capa" />
      }
      {
        !event.image && (
          <Icon
            size={45}
            name="image-v"
            className="event-card__header__icon"
          />
        )
      }
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        className="event-card__header__info"
      >
        <Chip
          color={color}
          label={label}
          sx={{
            color: (palette) => palette[color].dark,
            backgroundColor: ({ background }) => background.default,
          }}
          icon={
            <Box
              className="event-card__header__info__bullet"
              sx={{ backgroundColor: (palette) => palette[color].dark }}
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
          <Icon
            className={
              joinClass(
                'event-card__header__info__action-button',
                open && 'event-card__header__info__action-button--close',
              )
            }
            name={open ? 'times' : 'ellipsis-v'}
          />
        </ButtonIcon>
      </Stack>
    </Box>
  );
}