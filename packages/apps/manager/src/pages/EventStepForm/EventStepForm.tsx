import { useEffect, useState } from 'react';
import { Outlet, useNavigate, generatePath, useLocation, useParams } from 'react-router-dom';

import Icon from '@iziui/react/Icon';
import Stack from '@iziui/react/Stack';
import Button from '@iziui/react/Button';
import Loading from '@iziui/react/Loading';
import ButtonIcon from '@iziui/react/ButtonIcon';
import Slide from '@iziui/react/animations/Slide';
import useResize from '@iziui/react/hooks/useResize';
import { useToast } from '@iziui/react/Toast';
import { TabButton, Tabs, useTabs } from '@iziui/react/Tabs';
import { Menu, MenuButton, useMenu } from '@iziui/react/Menu';

import { slug } from '@eventapp/toolkit/string';
import { formatDate } from '@eventapp/toolkit/date';
import { hash, uuid } from '@eventapp/toolkit/uuid';
import { getExtension } from '@eventapp/toolkit/file';
import { toEnum, byEnum } from '@eventapp/toolkit/enum';

import { useAuth } from '@eventapp/modules/auth';
import { useEvent } from '@eventapp/modules/event';

import { storage } from '@/services/core';

import EventFormProvider, { useEventForm } from './components/EventForm';

enum CreateEvenMap {
  'informacoes-basicas',
  'data-hora',
  'localizacao',
  'ingressos',
  'revisao',
}

function getFallbackDate(date?: Date, time?: Date) {
  return {
    date: date ??
      formatDate(new Date(), {
        locale: 'sv-SE',
        options: { year: 'numeric', month: '2-digit', day: '2-digit' }
      }),
    time: time ??
      formatDate(new Date(), {
        locale: 'sv-SE',
        options: {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }
      }),
  };
}

function EventStepFormContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const { addToast } = useToast();
  const [open, el, toggle] = useMenu();

  const [setTab, currentTab] = useTabs(0);

  const { user } = useAuth();
  const { saveDraft } = useEvent();

  const [isMobile, setIsMobile] = useState(false);
  const [eventId, setEventId] = useState(params.eventId);

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
    navigate(
      generatePath(`/criar-evento/${toEnum(CreateEvenMap, tabIndex)}`)
    );
  };

  const handleSaveDraft = () => {
    const values = formGroup.values;

    if (!values.name) {
      addToast({
        delay: 50000,
        color: 'warning',
        message: 'É preciso adicionar um "nome" para salvar o rascunho',
        icon: <Icon name="info-circle" />
      });
      toggle();
      return;
    }

    const id = eventId || `${slug(values.name)}-${hash(uuid())}`;

    const file = values.image;

    const start = getFallbackDate(values.startDate, values.startTime);
    const end = getFallbackDate(values.endDate, values.endTime);

    if (file) {
      const ext = getExtension(file.name);
      const name = `capa.${ext}`;

      storage.upload({
        file,
        path: `${id}/${name}`
      });
    }

    // saveDraft({
    //   id,
    //   image: '',
    //   ownerId: user?.id,
    //   name: values.name ?? '',
    //   subject: values.subject ?? '' as any,
    //   category: values.category ?? '' as any,
    //   description: values.description ?? '',
    //   tickets: values.tickets ?? [],
    //   address: values.address ?? {} as any,
    //   schedule: {
    //     startDate: new Date(`${start.date}T${start.time}`),
    //     endDate: new Date(`${end.date}T${end.time}`),
    //   },
    // }).then(({ id }) => setEventId(id));
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
                variant="text"
                startIcon={<Icon name="save" />}
                onClick={handleSaveDraft}
              >
                Salvar rascunho
              </Button>
              <Button variant="outlined" startIcon={<Icon name="eye" />}>
                Pré-visualizar
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
          <MenuButton
            label="Pré-visualizar"
            icon={<Icon name="eye" />}
          />
        </Menu>
        <Outlet />
      </Stack>
    </Slide>
  );
}

export default function EventStepForm() {
  return (
    <EventFormProvider>
      <EventStepFormContent />
    </EventFormProvider>
  );
}