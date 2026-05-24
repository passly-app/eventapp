import { useEffect, useMemo, useState } from 'react';

import Input from '@iziui/react/Input';
import Stack from '@iziui/react/Stack';
import Button from '@iziui/react/Button';
import Loading from '@iziui/react/Loading';
import Typography from '@iziui/react/Typography';
import { Form, useForm, Control } from '@iziui/react/lab/Form';
import { Modal, ModalFooter, HelperModalProps } from '@iziui/react/Modal';

import { permissions, type RoleConfig, useRoles } from '@eventapp/modules/roles';

import PermissionsList from '@/components/PermissionsList';

export default function FormRoleModal({ role, isOpen, onToggle }: HelperModalProps<{ role?: RoleConfig }>) {
  const { createRole, updateRole } = useRoles();

  const [loading, setLoading] = useState(false);

  const isEdit = useMemo(() => Boolean(role), [role]);

  const formGroup = useForm<Omit<RoleConfig, 'id'>>({
    form: {
      name: { defaultValue: role?.name || '' },
      description: { defaultValue: role?.description || '' },
      permissions: { defaultValue: role?.permissions || [] },
    },
    handle: {
      submit: (form) => {
        const { name, description, permissions } = form.values;

        let promise!: Promise<void>;

        if (role) { promise = updateRole({ ...role, name, description, permissions }); }
        if (!role) { promise = createRole({ name, description, permissions }); }

        promise
          .then(onToggle)
          .finally(() => setLoading(false));
      }
    }
  }, []);

  useEffect(() => { if (!isOpen) { formGroup.reset(); } }, [isOpen]);

  const handleSelectAll = () => {
    formGroup.setValues({ permissions: permissions as any[] });
  };

  return (
    <Modal
      isOpen={isOpen}
      title={
        <Typography variant="h6">
          {
            isEdit
              ? 'Editar role'
              : 'Criar nova role'
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
              disabled={isEdit}
              placeholder="Nome"
              data-cy="name-role"
              value={control.value}
              error={control.isInvalid}
              helperText={control.error}
            />
          )}
        />
        <Control
          controlName="description"
          field={(control) => (
            <Input
              fullWidth
              placeholder="Descrição"
              data-cy="description-role"
              value={control.value}
              error={control.isInvalid}
              helperText={control.error}
            />
          )}
        />
        <Stack flexDirection="row" justifyContent="space-between">
          <Typography variant="body1" color="text.secondary">Permissões</Typography>
          <Button
            size="small"
            type="button"
            variant="text"
            onClick={handleSelectAll}
          >
            Selecionar tudo
          </Button>
        </Stack>
        <div style={{ maxHeight: 400, overflow: 'auto' }}>
          <Control
            controlName="permissions"
            field={(control) => (
              <PermissionsList value={control.value} />
            )}
          />
        </div>
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
            type="submit"
            variant="contained"
            loading={loading && <Loading />}
          >
            {isEdit ? 'Salvar' : 'Criar'}
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}