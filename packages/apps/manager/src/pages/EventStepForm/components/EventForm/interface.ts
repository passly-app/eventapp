import { type Event, Category, Subject } from '@eventapp/modules/event';

export interface EventForm {
  name: string;
  description: string;
  image: File;
  subject: Subject;
  category: Category;
  address: Event['address'];
  tickets: Event['tickets'];
  startDate: Date;
  startTime: Date;
  endDate: Date;
  endTime: Date;
}