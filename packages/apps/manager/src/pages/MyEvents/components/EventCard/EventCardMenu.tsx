import Icon from '@iziui/react/Icon';
import { Menu, MenuButton } from '@iziui/react/Menu';

import { type Event } from '@eventapp/modules/event';

interface EventCardMenuProps {
  event: Event;
  open: boolean;
  loading: boolean;
  el: HTMLElement | null;
  toggle: () => void;
  handleDelete: () => void;
}

export function EventCardMenu({
  el,
  event,
  open,
  toggle,
  loading,
  handleDelete,
}: EventCardMenuProps) {
  return (
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
      {
        event.status === 'draft' && (
          <MenuButton
            disabled={loading}
            label="Publicar evento"
            icon={<Icon name="eye" />}
          />
        )
      }
      {
        event.status === 'published' && (
          <MenuButton
            disabled={loading}
            label="Desativar evento"
            icon={<Icon name="eye-slash" />}
          />
        )
      }
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
  );
}