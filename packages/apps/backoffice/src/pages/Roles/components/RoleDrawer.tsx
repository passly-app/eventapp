import Icon from '@iziui/react/Icon';
import Stack from '@iziui/react/Stack';
import Button from '@iziui/react/Button';
import Divider from '@iziui/react/Divider';
import { useModal } from '@iziui/react/Modal';
import Typography from '@iziui/react/Typography';
import ButtonIcon from '@iziui/react/ButtonIcon';
import { Drawer, DrawerContent, DrawerFooter, HelperDrawerProps } from '@iziui/react/Drawer';

import type { RoleConfig } from '@eventapp/modules/roles';

import DeleteRoleModal from './DeleteRoleModal';
import FormRoleModal from './FormRoleModal';

export default function UserDrawer({ isOpen, role, onToggle }: HelperDrawerProps<{ role?: RoleConfig }>) {
  const [open, toggleModal] = useModal();
  const [openEdit, toggleEditModal] = useModal();

  return (
    <>
      <Drawer
        direction="right"
        open={isOpen}
        onClose={onToggle}
        body={
          <DrawerContent>
            <Stack flexDirection="column">
              <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">{role?.name}</Typography>
                <ButtonIcon onClick={toggleEditModal}>
                  <Icon name="edit" />
                </ButtonIcon>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {role?.description}
              </Typography>
              <Divider />
              <Typography variant="subtitle1">
                Permissões
              </Typography>
              {
                role?.permissions.map(permission => (
                  <Typography
                    key={permission}
                    variant="body2"
                    color="text.secondary"
                  >
                    {permission}
                  </Typography>
                ))
              }
            </Stack>
          </DrawerContent>
        }
        footer={
          <DrawerFooter>
            <Stack flexDirection="row" justifyContent="center">
              <Button
                color="error"
                onClick={toggleModal}
                startIcon={<Icon name="trash" />}
              >
                deletar role
              </Button>
            </Stack>
          </DrawerFooter>
        }
      />
      <FormRoleModal
        role={role}
        isOpen={openEdit}
        onToggle={toggleEditModal}
      />
      <DeleteRoleModal
        role={role}
        isOpen={open}
        onToggleModal={toggleModal}
        onToggleDrawer={onToggle}
      />
    </>
  );
}