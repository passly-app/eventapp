import { type Event, Category, Subject } from '@eventapp/modules/event';

export const eventMock: Omit<Event, 'ownerId'> = {
  id: 'event-001',
  name: 'Frontend Summit Rio 2026',
  image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
  description: `
O Frontend Summit Rio 2026 é um evento voltado para desenvolvedores,
designers e profissionais de tecnologia interessados em frontend moderno,
arquitetura de aplicações, design systems e performance web.

O evento contará com palestras, networking, workshops e painéis técnicos.
  `,
  subject: Subject.TECHNOLOGY_AND_PROGRAMMING,
  category: Category.LECTURE_CONGRESS_OR_SEMINAR,

  schedule: {
    startDatetime: new Date('2026-08-15T09:00:00'),
    endDatetime: new Date('2026-08-15T20:00:00'),
  },

  address: {
    street: 'Av. Atlântica',
    number: '1702',
    neighborhood: 'Copacabana',
    city: 'Rio de Janeiro',
    state: 'RJ',
    zipCode: '22021-001',
    country: 'Brazil',
    latitude: -22.9711,
    longitude: -43.1822,
  },

  tickets: {
    name: 'Ingresso Early Bird',
    count: '150',
    value: '199.90',

    schedule: {
      startDatetime: new Date('2026-05-01T00:00:00'),
      endDatetime: new Date('2026-08-10T23:59:59'),
    },

    limits: {
      min: 1,
      max: 4,
    },

    description: `
Ingresso promocional de primeiro lote com acesso completo ao evento,
incluindo palestras, área de networking e coffee break.
    `,
  },
};