import { useState, type PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Icon from '@iziui/react/Icon';
import Stack from '@iziui/react/Stack';
import Slide from '@iziui/react/animations/Slide';
import useResize from '@iziui/react/hooks/useResize';
import { Menu, MenuButton, useMenu } from '@iziui/react/Menu';

import { useAuth } from '@eventapp/modules/auth';

import Header from './Header';
import Content from './Content';
import HeaderButton from './Header/HeaderButton';
import ButtonProfile from './Header/ButtonProfile';
import { BottomMenu, BottomMenuButton } from './BottomMenu';

export default function Layout({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, el, toggle] = useMenu();

  const { user, logout } = useAuth();

  const [isMobile, setIsMobile] = useState(false);

  useResize({
    onMd: () => { setIsMobile(false); },
    onSm: () => { setIsMobile(true); },
    onXs: () => { setIsMobile(true); }
  });

  const goToByMenu = () => {
    navigate('/profile');
    toggle();
  };

  return (
    <Stack gap={0} style={{ height: '100%' }}>
      <Slide enter direction="top" timeout={.3}>
        <Header
          compact={isMobile}
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
          buttons={
            <Stack flexDirection="row" justifyContent="center">
              <HeaderButton
                variant="text"
                color={location.pathname.includes('/home') ? 'primary' : 'grey'}
                onClick={() => navigate('/home')}
              >
                Home
              </HeaderButton>
              <HeaderButton
                variant="text"
                color={location.pathname.includes('/meus-eventos') ? 'primary' : 'grey'}
                onClick={() => navigate('/meus-eventos')}
              >
                Meus eventos
              </HeaderButton>
              <HeaderButton
                variant="text"
                color={location.pathname.includes('/meus-ingressos') ? 'primary' : 'grey'}
                onClick={() => navigate('/meus-ingressos')}
              >
                Meus ingressos
              </HeaderButton>
              <HeaderButton
                color="primary"
                variant="outlined"
                onClick={() => navigate('/criar-evento')}
              >
                criar evento
              </HeaderButton>
            </Stack>
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
      <Content>
        {children}
      </Content>
      <BottomMenu show={isMobile}>
        <BottomMenuButton
          active={location.pathname.includes('/home')}
          label="Home"
          icon={<Icon name="home" />}
          onClick={() => navigate('/home')}
        />
        <BottomMenuButton
          active={location.pathname.includes('/meus-eventos')}
          label="Eventos"
          icon={<Icon name="calendar-alt" />}
          onClick={() => navigate('/meus-eventos')}
        />
        <BottomMenuButton
          active={location.pathname.includes('/meus-ingressos')}
          label="Ingressos"
          icon={<Icon name="ticket" />}
          onClick={() => navigate('/meus-ingressos')}
        />
        <BottomMenuButton
          active={location.pathname.includes('/criar-evento')}
          label="Criar"
          icon={<Icon name="plus-circle" />}
          onClick={() => navigate('/criar-evento')}
        />
      </BottomMenu>
    </Stack>
  );
}