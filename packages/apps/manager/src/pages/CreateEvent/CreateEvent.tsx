import { Outlet, useNavigate, generatePath } from 'react-router-dom';

import Icon from '@iziui/react/Icon';
import Stack from '@iziui/react/Stack';
import Slide from '@iziui/react/animations/Slide';
import { TabButton, Tabs, useTabs } from '@iziui/react/Tabs';

import { toEnum } from '@eventapp/toolkit/enum';

enum CreateEvenMap {
  'informacoes-basicas',
  'data-hora',
  'localizacao',
  'ingressos',
  'revisao',
}

export default function CreateEvent() {
  const navigate = useNavigate();

  const [setTab, currentTab] = useTabs(0);

  const goTo = (tabIndex: number) => {
    setTab(tabIndex);

    navigate(
      generatePath(`/criar-evento/${toEnum(CreateEvenMap, tabIndex)}`)
    );
  };

  return (
    <Slide enter>
      <Stack>
        <Tabs fullWidth onChange={goTo} current={currentTab}>
          <TabButton label="Informações" icon={<Icon name="notes" />} />
          <TabButton label="Quando" icon={<Icon name="calendar-alt" />} />
          <TabButton label="Local" icon={<Icon name="map-marker" />} />
          <TabButton label="Ingressos" icon={<Icon name="ticket" />} />
          <TabButton label="Revisão" icon={<Icon name="file-check" />} />
        </Tabs>
        <Outlet />
      </Stack>
    </Slide>
  );
}