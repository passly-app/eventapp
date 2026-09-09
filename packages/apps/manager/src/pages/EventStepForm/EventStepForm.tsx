import { useEffect, useState } from 'react';
import { Outlet, useNavigate, generatePath, useLocation, useParams } from 'react-router-dom';

import Icon from '@iziui/react/Icon';
import Stack from '@iziui/react/Stack';
import Button from '@iziui/react/Button';
import Loading from '@iziui/react/Loading';
import ButtonIcon from '@iziui/react/ButtonIcon';
import Slide from '@iziui/react/animations/Slide';
import useResize from '@iziui/react/hooks/useResize';
import { TabButton, Tabs, useTabs } from '@iziui/react/Tabs';
import { Menu, MenuButton, useMenu } from '@iziui/react/Menu';

import { toEnum, byEnum } from '@eventapp/toolkit/enum';

import EventFormProvider, { useEventForm } from './components/EventForm';

enum CreateEvenMap {
  'informacoes-basicas',
  'data-hora',
  'localizacao',
  'ingressos',
  'revisao',
}

function EventStepFormContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const [open, el, toggle] = useMenu();
  const [setTab, currentTab] = useTabs(0);

  const { saveDraft } = useEventForm();

  const [isMobile, setIsMobile] = useState(false);

  useResize({
    onXl() { setIsMobile(false); },
    onLg() { setIsMobile(false); },
    onMd() { setIsMobile(false); },
    onSm() { setIsMobile(true); },
    onXs() { setIsMobile(true); },
  });

  const { formGroup, loading } = useEventForm();

  useEffect(() => {
    const path = location.pathname.split('/').reverse()[0] as keyof typeof CreateEvenMap;
    setTab(byEnum(CreateEvenMap, path));
  }, [location]);

  const goTo = (tabIndex: number) => {
    const path = params.eventId
      ? generatePath(`/editar-evento/:eventId/${toEnum(CreateEvenMap, tabIndex)}`, { eventId: params.eventId })
      : generatePath(`/criar-evento/${toEnum(CreateEvenMap, tabIndex)}`);
    navigate(path);
  };

  const handleSaveDraft = () => {
    saveDraft()
      .then(() => toggle());
  };

  return (
    <Slide enter style={{ height: '100%' }}>
      <Stack style={{ height: '100%' }}>
        <Tabs fullWidth onChange={goTo} current={currentTab}>
          <TabButton label="Informações" icon={<Icon name="notes" />} />
          <TabButton label="Quando" icon={<Icon name="calendar-alt" />} />
          <TabButton label="Onde" icon={<Icon name="map-marker" />} />
          <TabButton label="Ingressos" icon={<Icon name="ticket" />} />
          <TabButton label="Revisão" icon={<Icon name="file-check" />} />
        </Tabs>
        {
          !isMobile && (
            <Stack flexDirection="row" justifyContent="flex-end">
              <Button
                color="grey"
                variant="outlined"
                startIcon={<Icon name="save" />}
                onClick={saveDraft}
              >
                Salvar rascunho
              </Button>
              <Button
                color="success"
                startIcon={<Icon name="rocket" />}
                loading={loading && <Loading />}
                onClick={() => formGroup.submit()}
              >
                Publicar evento
              </Button>
            </Stack>
          )
        }
        {
          isMobile && (
            <Stack flexDirection="row" justifyContent="flex-end">
              <Button fullWidth color="success" startIcon={<Icon name="rocket" />}>
                Publicar evento
              </Button>
              <ButtonIcon color="grey" onClick={toggle}>
                <Icon name="ellipsis-v" />
              </ButtonIcon>
            </Stack>
          )
        }
        <Menu
          direction="right"
          open={open}
          anchorEl={el}
          width="fit-content"
          onClose={toggle}
        >
          <MenuButton
            label="Salvar rascunho"
            icon={<Icon name="save" />}
            onClick={handleSaveDraft}
          />
        </Menu>
        <Outlet />
      </Stack>
    </Slide>
  );
}

export default function EventStepForm() {
  const { eventId } = useParams();

  return (
    <EventFormProvider key={eventId ?? 'new'}>
      <EventStepFormContent />
    </EventFormProvider>
  );
}