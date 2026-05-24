import { useEffect, useMemo, useState } from 'react';

import Input from '@iziui/react/Input';
import Button from '@iziui/react/Button';
import Loading from '@iziui/react/Loading';
import Divider from '@iziui/react/Divider';
import Typography from '@iziui/react/Typography';
import { Control, Form, useForm } from '@iziui/react/lab/Form';
import { Modal, ModalFooter, HelperModalProps } from '@iziui/react/Modal';

import { useAuth } from '@eventapp/modules/auth';
import { UserData } from '@eventapp/modules/user';

import RoleList from '@/components/RolesList';

import useUsers from '../useUsers';

export default function FormUserModal({
  user,
  isOpen,
  onToggle
}: HelperModalProps<{ user?: UserData; }>) {
  const { updateUser, getUsers } = useUsers();

  const { createByBackoffice } = useAuth();

  const [loading, setLoading] = useState(false);

  const isEdit = useMemo(() => Boolean(user), [user]);

  const formGroup = useForm<Pick<UserData, 'name' | 'email' | 'roles' | 'plans'>>({
    form: {
      name: { defaultValue: user?.name || '', },
      email: { defaultValue: user?.email || '', },
      roles: { defaultValue: user?.roles || [], },
      plans: { defaultValue: user?.plans || [], },
    },
    handle: {
      submit: (form) => {
        let promise!: Promise<any>;

        if (user) { promise = updateUser({ ...user, ...form.values }); }
        if (!user) {
          promise = createByBackoffice({ ...form.values })
            .then(getUsers);
        }

        promise
          .then(onToggle)
          .finally(() => setLoading(false));
      }
    }
  }, [user]);

  useEffect(() => {
    if (isOpen) { return; }

    formGroup.reset();
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      title={
        <Typography variant="h6">
          {
            isEdit
              ? 'Editar usuário'
              : 'Adicionar usuário'
          }
        </Typography>
      }
      onClose={onToggle}
    >
      <Form formGroup={formGroup}>
        <Control
          controlName="name"
          field={(control) => (
            <Input
              fullWidth
              placeholder="Nome"
              data-cy="name-user-backoffice"
              value={control.value}
              error={control.isInvalid}
              helperText={control.error}
            />
          )}
        />
        <Control
          controlName="email"
          field={(control) => (
            <Input
              fullWidth
              disabled={isEdit}
              placeholder="Email"
              data-cy="email-user-backoffice"
              value={control.value}
              error={control.isInvalid}
              helperText={control.error}
            />
          )}
        />
        <Typography variant="body1" color="text.secondary">Planos</Typography>

        <Divider />
        <Typography variant="body1" color="text.secondary">Roles</Typography>
        <div style={{ maxHeight: 400, overflow: 'auto' }}>
          <RoleList
            onChange={(roles) => formGroup.setValues({ roles })}
            value={formGroup.values.roles}
          />
        </div>
        <ModalFooter>
          <Button
            type="button"
            variant="outlined"
            color="primary"
            onClick={onToggle}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            loading={loading && <Loading />}
          >
            Salvar
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}