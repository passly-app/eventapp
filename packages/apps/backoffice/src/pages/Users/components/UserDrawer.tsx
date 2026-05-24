import { useMemo } from 'react';

import Icon from '@iziui/react/Icon';
import Chip from '@iziui/react/Chip';
import Stack from '@iziui/react/Stack';
import Button from '@iziui/react/Button';
import Avatar from '@iziui/react/Avatar';
import Divider from '@iziui/react/Divider';
import Tooltip from '@iziui/react/Tooltip';
import ButtonIcon from '@iziui/react/ButtonIcon';
import Typography from '@iziui/react/Typography';
import { useModal } from '@iziui/react/Modal';
import { Drawer, DrawerContent, DrawerFooter, HelperDrawerProps } from '@iziui/react/Drawer';

import { useAuth } from '@eventapp/modules/auth';
import { UserData } from '@eventapp/modules/user';

import FormUserModal from './FormUserModal';
import DeleteUserModal from './StatusUserModal';

export default function UserDrawer({ isOpen, user, onToggle }: HelperDrawerProps<{ user?: UserData }>) {
  const [openEditModal, toggleEditModal] = useModal();
  const [openStatusModal, toggleStatusModal] = useModal();

  const { sendMailToResetPassword } = useAuth();

  const isActive = useMemo(() => user?.status === 'active', [user]);

  const handleResetPassword = () => {
    return sendMailToResetPassword(user?.email as string)
      .then(onToggle);
  };

  return (
    <>
      <Drawer
        direction="right"
        open={isOpen}
        onClose={onToggle}
        body={
          <DrawerContent fullWidth>
            <Stack flexDirection="column">
              <Stack>
                <Stack flexDirection="row" justifyContent="space-between">
                  <div style={{ width: '100%' }}>
                    <Avatar
                      src={user?.picture}
                      name={user?.name}
                      sx={{
                        color: ({ text }) => text.secondary,
                        backgroundColor: ({ background }) => background.paper
                      }}
                    />
                  </div>
                  <Stack
                    gap={8}
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <Tooltip label="Resetar senha">
                      <ButtonIcon onClick={handleResetPassword} color="grey">
                        <Icon name="envelope-shield" />
                      </ButtonIcon>
                    </Tooltip>
                    <Tooltip label="Editar">
                      <ButtonIcon onClick={toggleEditModal} color="grey">
                        <Icon name="edit" />
                      </ButtonIcon>
                    </Tooltip>
                  </Stack>
                </Stack>
                <Stack justifyContent="space-between" flexDirection="row" alignItems="center">
                  <div>
                    <Typography variant="body1">{user?.name}</Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {user?.email}
                    </Typography>
                  </div>
                  <Chip
                    size="small"
                    label={user?.status || ''}
                    color={isActive ? 'success' : 'error'}
                  />
                </Stack>
              </Stack>
              <Divider />
              <Stack flexDirection="row" alignItems="center">
                <Typography>Roles:</Typography>
                {
                  user?.roles.map(role => (
                    <Chip
                      key={role}
                      label={role}
                      variant="contained"
                    />
                  ))
                }
              </Stack>
            </Stack>
          </DrawerContent>
        }
        footer={
          <DrawerFooter>
            <Stack flexDirection="row" justifyContent="center">
              <Button
                color={isActive ? 'error' : 'success'}
                variant={isActive ? 'contained' : 'outlined'}
                startIcon={
                  <Icon name={
                    isActive ? 'user-times' : 'user-check'
                  } />
                }
                onClick={toggleStatusModal}
              >
                {isActive ? 'Desativar' : 'Ativar'} usuário
              </Button>
            </Stack>
          </DrawerFooter>
        }
      />
      <FormUserModal
        user={user}
        isOpen={openEditModal}
        onToggle={toggleEditModal}
      />
      <DeleteUserModal
        user={user}
        isOpen={openStatusModal}
        onToggle={toggleStatusModal}
        onToggleDrawer={onToggle}
      />
    </>
  );
}