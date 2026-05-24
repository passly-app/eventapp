import { useState } from 'react';

import Icon from '@iziui/react/Icon';
import Button from '@iziui/react/Button';
import Loading from '@iziui/react/Loading';
import Typography from '@iziui/react/Typography';
import { Modal, ModalFooter, HelperModalProps } from '@iziui/react/Modal';

import { useRoles, type RoleConfig } from '@eventapp/modules/roles';

interface DeleteRoleModalProps { role?: RoleConfig; onToggleDrawer: () => void; }

export default function DeleteRoleModal({
  role,
  isOpen,
  onToggle,
  onToggleDrawer
}: HelperModalProps<DeleteRoleModalProps>) {
  const { deleteRole } = useRoles();

  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);

    deleteRole(role?.id || '')
      .then(onToggle)
      .then(onToggleDrawer)
      .finally(() => setLoading(false));
  };

  return (
    <Modal
      isOpen={isOpen}
      title={
        <Typography variant="h6">Deletar role</Typography>
      }
      onClose={onToggle}
    >
      <Typography>Tem certeza que deseja deletar a role <strong>&quot;{role?.name}&quot;</strong>?</Typography>
      <ModalFooter>
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