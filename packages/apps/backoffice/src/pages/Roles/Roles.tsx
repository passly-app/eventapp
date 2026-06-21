import { useMemo, useState } from 'react';

import Icon from '@iziui/react/Icon';
import Stack from '@iziui/react/Stack';
import Input from '@iziui/react/Input';
import Slide from '@iziui/react/animations/Slide';
import Button from '@iziui/react/Button';
import Loading from '@iziui/react/Loading';
import Avatar from '@iziui/react/Avatar';
import ButtonIcon from '@iziui/react/ButtonIcon';
import Typography from '@iziui/react/Typography';
import { Grid, GridItem } from '@iziui/react/Grid';
import { Card, CardContent } from '@iziui/react/Card';
import { Form, Control, useForm } from '@iziui/react/lab/Form';
import { useModal } from '@iziui/react/Modal';
import { useDrawer } from '@iziui/react/Drawer';

import { slug } from '@eventapp/toolkit/string';

import { useRoles, RoleConfig } from '@eventapp/modules/roles';

import EmptyContent from '@eventapp/common/components/EmptyContent';
import { debounce } from '@eventapp/common/utils';
import { useFilter } from '@eventapp/common/hooks/useFilter';

import Page from '@/layout/Page';
import { release } from '@/services/core';

import RoleDrawer from './components/RoleDrawer';
import FormRoleModal from './components/FormRoleModal';

export default function Roles() {
  const [open, toggle] = useModal();
  const [openDrawer, toggleDrawer] = useDrawer();

  const { roles } = useRoles();
  const { filter, filtered, reset } = useFilter(roles, []);

  const [loadingList, setLoadingList] = useState(false);
  const [currentSearch, setCurrentSearch] = useState('');
  const [selectedRoleId, setSelectedRoleId] = useState<string>();

  const selectedRole = useMemo(() => roles.find(r => r.id === selectedRoleId), [roles, selectedRoleId]);

  const formGroup = useForm<{ name: string; }>({
    form: {
      name: { defaultValue: '' },
    },
    handle: {
      change: (form) => {
        const { name } = form.values;

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

  const resetForm = () => { formGroup.setValues({ name: '' }); };

  const handleSelectRole = (role: RoleConfig) => {
    setSelectedRoleId(role.id);
    toggleDrawer();
  };

  return (
    <Page
      title="Roles"
      subtitle="Aqui você pode visualizar e gerenciar todas as roles"
      release={release}
      action={
        <Button
          variant="contained"
          startIcon={<Icon name="plus" />}
          onClick={toggle}
        >
          Nova role
        </Button>
      }
    >
      <Stack>
        <Grid xl={3} lg={4} md={6} sm={12}>
          <GridItem>
            <Form formGroup={formGroup}>
              <Control
                action="change"
                controlName="name"
                field={(control) =>
                  <Input
                    fullWidth
                    type="text"
                    placeholder="Nome da role"
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
            </Form>
          </GridItem>
        </Grid>
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
            <Grid xl={3} lg={4} md={6} sm={12}>
              {
                filtered.map((role, i) => (
                  <GridItem key={role.id}>
                    <Slide enter delay={(i + 1) * 100}>
                      <Card onClick={() => handleSelectRole(role)}>
                        <CardContent>
                          <Stack flexDirection="row" alignItems="center">
                            <Avatar color="secondary" icon={<Icon name="shield" />} />
                            <Typography variant="body1" color="text.secondary">
                              {role.name}
                            </Typography>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Slide>
                  </GridItem>
                ))
              }
            </Grid>
          )
        }
        {
          !loadingList && !filtered.length && (
            <EmptyContent
              icon="constructor"
              message="Nenhuma role foi encontrada"
            />
          )
        }
      </Stack>
      <FormRoleModal isOpen={open} onToggle={toggle} />
      <RoleDrawer
        role={selectedRole}
        isOpen={openDrawer}
        onToggle={toggleDrawer}
      />
    </Page>
  );
}