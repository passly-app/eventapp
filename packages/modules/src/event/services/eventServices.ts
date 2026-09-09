import { uuid, hash } from '@eventapp/toolkit/uuid';
import { slug } from '@eventapp/toolkit/string';

import type DB from '@eventapp/integrations/db';
import { convertDate } from '@eventapp/integrations/db';

import type { Event, EventFirebase, SaveDraftAssing } from '../interface';

type SaveDraft = Partial<Event> & Pick<Event, 'name' | 'schedule' | 'id'>;

function mapEvent(event: EventFirebase): Event {
  return {
    ...event,
    schedule: {
      startDate: event.schedule.startDate.toDate(),
      endDate: event.schedule.endDate.toDate(),
    }
  };
}

export default class EventServices {
  private static PATH = 'events';

  constructor(private db: DB) { }

  public generateId(name: string) {
    return `${slug(name)}-${hash(uuid())}`;
  }

  public async getDetails(eventId: string) {
    return this.db.getItem<EventFirebase>({
      path: EventServices.PATH,
      pathSegments: [],
      filters: [
        { field: 'id', operator: '==', value: eventId },
      ],
    }).then(event => {
      if (!event) { return; }
      return mapEvent(event);
    });
  }

  public async getEvents(ownderId: string) {
    return this.db.getList<EventFirebase>({
      path: EventServices.PATH,
      pathSegments: [],
      filters: [
        { field: 'ownerId', operator: '==', value: ownderId },
      ],
    }).then(events => events.map(mapEvent));
  }

  public async create(event: Omit<Event, 'id'>) {
    const id = this.generateId(event.name);
    const newEvent: Event = { ...event, id };

    return this.db.setItem<Event>({
      data: newEvent,
      path: EventServices.PATH,
      pathSegments: [id],
    }).then(() => newEvent);
  }

  public async copy(event: Omit<Event, 'id'>) {
    const id = this.generateId(event.name);
    const newEvent: Event = {
      ...event,
      id,
      status: 'draft',
      name: `${event.name} - Copy`,
    };

    return this.db.setItem<Event>({
      data: newEvent,
      path: EventServices.PATH,
      pathSegments: [id],
    }).then(() => newEvent);
  }

  public async saveDraft(event: SaveDraft) {
    const newEvent: SaveDraftAssing = {
      ...event,
      status: 'draft',
      schedule: {
        startDate: convertDate(event.schedule.startDate),
        endDate: convertDate(event.schedule.endDate),
      }
    };

    return this.db.setItem<SaveDraftAssing>({
      data: newEvent,
      path: EventServices.PATH,
      pathSegments: [event.id],
    }).then(() => newEvent);
  }

  public deleteEvent(eventId: string) {
    return this.db.deleteItem({
      path: EventServices.PATH,
      pathSegments: [eventId],
    });
  }

  public update(event: Event) {
    return this.db.update({
      data: event,
      path: EventServices.PATH,
      pathSegments: [event.id],
    });
  }
}