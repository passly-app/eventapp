import { PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@iziui/react/Box';
import Icon from '@iziui/react/Icon';
import Slide from '@iziui/react/animations/Slide';
import Stack from '@iziui/react/Stack';
import Loading from '@iziui/react/Loading';
import Tooltip from '@iziui/react/Tooltip';
import { createTheme, useTheme } from '@iziui/react/theme';
import { Menu, MenuButton, useMenu } from '@iziui/react/Menu';

import { useAuth } from '@eventapp/modules/auth';

import { light, dark } from '@eventapp/common/theme';

import { url } from '@/services/core';

import { Content } from './Content';
import { Sidebar, SidebarButton } from './Sidebar';
import { ButtonMode, ButtonProfile, Header } from './Header';

export default function Layout({ children }: PropsWithChildren) {
  const navigate = useNavigate();

  const [open, el, toggle] = useMenu();
  const { theme, updateTheme } = useTheme();

  const { user, logout } = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) { setLoading(false); }
  }, [user]);

  const toggleTheme = () => {
    updateTheme(createTheme(theme.mode === 'dark'
      ? light
      : dark
    ));
  };

  const goToByMenu = () => {
    navigate('/profile');
    toggle();
  };

  const handleLogout = async () => {
    return logout()
      .then(() => window.open(url.sso, '_self'));
  };

  return (
    <Box data-bolo="teste" sx={{ backgroundColor: ({ background }) => background.default }}>
      <Slide enter direction="top" timeout={.3}>
        <Header
          actions={<ButtonMode onUpdateMode={toggleTheme} />}
          buttonProfile={
            <ButtonProfile
              user={{
                name: user?.name || '',
                email: user?.email || '',
                picture: user?.picture || '',
              }}
              onProfile={toggle}
            />
          }
        />
        <Menu
          open={open}
          anchorEl={el}
          onClose={toggle}
          direction="right"
          width="fit-content"
        >
          <MenuButton
            label="Minha conta"
            icon={<Icon name="user" />}
            onClick={goToByMenu}
          />
          <MenuButton
            label="Sair"
            color="error"
            icon={<Icon name="signout" />}
            onClick={logout}
          />
        </Menu>
      </Slide>
      <Stack flexDirection="row" gap={0}>
        <Slide enter direction="left" timeout={.3} style={{ width: 'fit-content' }}>
          <Sidebar
            compact
            upButtons={
              <div>
                <Tooltip label="Usuários" direction="right">
                  <SidebarButton
                    path="users"
                    icon={<Icon name="users-alt" />}
                    onClick={() => navigate('/users')}
                  />
                </Tooltip>
                <Tooltip label="Roles" direction="right">
                  <SidebarButton
                    path="roles"
                    icon={<Icon name="constructor" />}
                    onClick={() => navigate('/roles')}
                  />
                </Tooltip>
              </div>
            }
            downButtons={
              <div>
                <SidebarButton
                  icon={<Icon name="setting" />}
                  onClick={goToByMenu}
                />
                <SidebarButton
                  icon={<Icon name="signout" />}
                  onClick={handleLogout}
                />
              </div>
            }
          />
        </Slide>
        <Content>
          {
            loading
              ? (
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  style={{ height: 300 }}
                >
                  <Loading size={70} />
                </Stack>
              )
              : children
          }
        </Content>
      </Stack>
    </Box>
  );
}