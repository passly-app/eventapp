import { uuid, hash } from '@eventapp/toolkit/uuid';
import { slug } from '@eventapp/toolkit/string';

import type DB from '../../../../integrations/src/db';
import type { Event } from '../interface';

export default class EventServices {
  private static PATH = 'events';

  constructor(private db: DB) { }

  public async create(event: Omit<Event, 'id'>) {
    const id = `${slug(event.name)}-${hash(uuid())}`;
    const newEvent: Event = { ...event, id };

    return this.db.setItem<Event>({
      data: newEvent,
      path: EventServices.PATH,
      pathSegments: [id],
    }).then(() => newEvent);
  }
}