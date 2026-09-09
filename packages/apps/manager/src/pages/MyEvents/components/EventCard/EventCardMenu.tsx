import Icon from '@iziui/react/Icon';
import { Menu, MenuButton } from '@iziui/react/Menu';

import type { Event } from '@eventapp/modules/event';

interface EventCardMenuProps {
  event: Event;
  open: boolean;
  loading: boolean;
  el: HTMLElement | null;

  onToggle: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onChangeStatus: (status: Event['status']) => void;
}

export function EventCardMenu({
  el,
  event,
  open,
  loading,
  onToggle,
  onDelete,
  onDuplicate,
  onChangeStatus,
}: EventCardMenuProps) {
  return (
    <Menu
      width="fit-content"
      direction="right"
      maxHeight="100%"
      open={open}
      anchorEl={el}
      onClose={onToggle}
    >
      <MenuButton
        disabled={loading}
        label="Duplicar evento"
        icon={<Icon name="copy-alt" />}
        onClick={onDuplicate}
      />
      {
        ['published', 'disabled'].includes(event.status) && (
          <MenuButton
            disabled={loading}
            label="Tornar rascunho"
            icon={<Icon name="file" />}
            onClick={() => onChangeStatus('draft')}
          />
        )
      }
      {
        ['draft', 'published'].includes(event.status) && (
          <MenuButton
            disabled={loading}
            label="Desativar evento"
            icon={<Icon name="eye-slash" />}
            onClick={() => onChangeStatus('disabled')}
          />
        )
      }
      {
        ['draft', 'disabled'].includes(event.status) && (
          <MenuButton
            disabled={loading}
            label="Publicar evento"
            icon={<Icon name="eye" />}
            onClick={() => onChangeStatus('published')}
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
        onClick={onDelete}
      />
    </Menu>
  );
}