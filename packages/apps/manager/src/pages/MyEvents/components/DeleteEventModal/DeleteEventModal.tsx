import { useState } from 'react';

import Icon from '@iziui/react/Icon';
import Button from '@iziui/react/Button';
import Loading from '@iziui/react/Loading';
import Typography from '@iziui/react/Typography';
import { Modal, ModalFooter, type HelperModalProps } from '@iziui/react/Modal';

import { useEvent, type Event } from '@eventapp/modules/event';

interface DeleteEventModalProps extends HelperModalProps {
  event: Event;
}

export default function DeleteEventModal({
  event,
  isOpen,
  onToggle,
}: DeleteEventModalProps) {
  const { deleteEvent } = useEvent();

  const [loading, setLoading] = useState<boolean>();

  const handleDelete = () => {
    deleteEvent(event.id)
      .finally(() => setLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onToggle}>
      <Typography textAlign="center" sx={{ mb: 2 }}>
        Tem certeza que deseja deletaro evento:
        <br />
        <strong>&quot;{event.name}&quot;</strong>?
      </Typography>
      <ModalFooter sx={{ mt: 2 }}>
        <Button
          type="button"
          variant="text"
          color="primary"
          onClick={onToggle}
        >
          Cancelar
        </Button>
        <Button
          color="error"
          variant="contained"
          startIcon={<Icon name="trash" />}
          loading={loading && <Loading />}
          onClick={handleDelete}
        >
          Deletar
        </Button>
      </ModalFooter>
    </Modal>
  );
}