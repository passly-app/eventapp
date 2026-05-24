import { useEffect, useMemo, useState } from 'react';

import Icon from '@iziui/react/Icon';
import Stack from '@iziui/react/Stack';
import Input from '@iziui/react/Input';
import Button from '@iziui/react/Button';
import Loading from '@iziui/react/Loading';
import ButtonIcon from '@iziui/react/ButtonIcon';
import { Grid, GridItem } from '@iziui/react/Grid';
import { Control, Form, useForm } from '@iziui/react/lab/Form';
import { Table, TableBody, TableCell, TableHeader } from '@iziui/react/Table';
import { useDrawer } from '@iziui/react/Drawer';
import { useModal } from '@iziui/react/Modal';

import { slug } from '@eventapp/toolkit/string';

import { UserData } from '@eventapp/modules/user';

import EmptyContent from '@eventapp/common/components/EmptyContent';
import { debounce } from '@eventapp/common/utils';
import { useFilter } from '@eventapp/common/hooks/useFilter';

import Page from '@/layout/Page';
import { release } from '@/services/core';

import useUsers from './useUsers';
import UserRow from './components/UserRow';
import UserDrawer from './components/UserDrawer';
import CreateUserModal from './components/FormUserModal';

export interface FilterForm {
  name: string;
  roles: string[];
}

export default function Users() {
  const [open, toggle] = useModal();
  const [openUserDrawer, toggleUserDrawer] = useDrawer();

  const { users, getUsers } = useUsers();

  const { filter, filtered, reset } = useFilter(users, []);

  const [selectedUserId, setSelectedUserId] = useState<string>();
  const [currentSearch, setCurrentSearch] = useState('');
  const [loadingList, setLoadingList] = useState(true);

  const selectedUser = useMemo(() => users.find(u => u.id === selectedUserId), [users, selectedUserId]);

  const formGroup = useForm<FilterForm>({
    form: {
      name: { defaultValue: '' },
      roles: { defaultValue: [] },
    },
    handle: {
      change: (form) => {
        const { name, roles } = form.values;

        filter((user) => user.roles.every(role => roles.includes(role)));

        if (currentSearch === name) { return; }

        debounce.delay(() => {
          setLoadingList(true);

          if (name.length < 4) {
            reset();
          } else {
            filter((user) => slug(user.name).includes(slug(name)));
          }

          setCurrentSearch(name);

          setTimeout(() => { setLoadingList(false); }, 1000);
        }, 500);
      }
    }
  }, []);

  useEffect(() => { getUsers().then(() => setLoadingList(false)); }, []);

  const resetForm = () => { formGroup.setValues({ name: '' }); };

  const handleOpenDrawer = (user: UserData) => {
    setSelectedUserId(user.id);
    toggleUserDrawer();
  };

  return (
    <Page
      title="Usuários"
      subtitle="Aqui você pode visualizar e gerenciar todos os usuários"
      release={release}
      action={
        <Button
          variant="contained"
          startIcon={<Icon name="plus" />}
          onClick={toggle}
        >
          Adicionar usuário
        </Button>
      }
    >
      <Stack>
        <Form formGroup={formGroup}>
          <Grid xl={3} lg={4} md={6} sm={12} style={{ alignItems: 'center' }}>
            <GridItem>
              <Control
                action="change"
                controlName="name"
                field={(control) =>
                  <Input
                    fullWidth
                    type="text"
                    placeholder="Nome do usuário"
                    startIcon={<Icon name="search" size={20} />}
                    endIcon={
                      control.value && (
                        <ButtonIcon onClick={resetForm}>
                          <Icon name="times" />
                        </ButtonIcon>
                      )
                    }
                    value={control.value}
                    error={control.isInvalid}
                    helperText={control.error}
                  />
                }
              />
            </GridItem>
          </Grid>
        </Form>
        {
          loadingList && (
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              style={{ height: 250 }}
            >
              <Loading size={50} />
            </Stack>
          )
        }
        {
          !loadingList && Boolean(filtered.length) && (
            <Table>
              <TableHeader>
                <TableCell style={{ width: 50 }}>Id</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell style={{ width: 200 }}>Roles</TableCell>
                <TableCell align="center" style={{ width: 50 }}>Detalhes</TableCell>
              </TableHeader>
              <TableBody>
                {
                  filtered.map((user, i) => (
                    <UserRow
                      key={user.id}
                      user={user}
                      index={i}
                      onView={handleOpenDrawer}
                    />
                  ))
                }
              </TableBody>
            </Table>
          )
        }
      </Stack>
      {
        !loadingList && !filtered.length && (
          <EmptyContent
            message="Nenhum usuário encontrado"
            icon="user-exclamation"
          />
        )
      }
      <UserDrawer
        user={selectedUser}
        isOpen={openUserDrawer}
        onToggle={toggleUserDrawer}
      />
      <CreateUserModal
        isOpen={open}
        onToggle={toggle}
      />
    </Page>
  );
}
