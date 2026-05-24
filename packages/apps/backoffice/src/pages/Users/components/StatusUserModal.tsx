import { useMemo, useState } from 'react';

import Button from '@iziui/react/Button';
import Loading from '@iziui/react/Loading';
import Typography from '@iziui/react/Typography';
import { Modal, ModalFooter, HelperModalProps } from '@iziui/react/Modal';

import { UserData } from '@eventapp/modules/user';

import useUsers from '../useUsers';

interface StatusUserModalProps { user?: UserData; onToggleDrawer: () => void; }

export default function StatusUserModal({
  user,
  isOpen,
  onToggle,
  onToggleDrawer
}: HelperModalProps<StatusUserModalProps>) {
  const { updateUser } = useUsers();

  const [loading, setLoading] = useState(false);

  const isActive = useMemo(() => user?.status === 'active', [user]);

  const handleChangeStatus = () => {
    setLoading(true);

    if (!user) { return; }

    updateUser({ ...user, status: isActive ? 'inactive' : 'active' })
      .then(onToggle)
      .then(onToggleDrawer)
      .finally(() => setLoading(false));
  };

  return (
    <Modal
      isOpen={isOpen}
      title={
        <Typography variant="h6">
          {
            isActive
              ? 'Desativar usuário'
              : 'Ativar usuário'
          }
        </Typography>
      }
      onClose={onToggle}
    >
      <Typography>
        Tem certeza que deseja
        {isActive ? ' desativar ' : ' ativar '}
        o usuário <strong>&quot;{user?.name}&quot;?</strong>
      </Typography>
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
          color={isActive ? 'error' : 'success'}
          variant="contained"
          loading={loading && <Loading />}
          onClick={handleChangeStatus}
        >
          {isActive ? 'Desativar' : 'Ativar'}
        </Button>
      </ModalFooter>
    </Modal>
  );
}