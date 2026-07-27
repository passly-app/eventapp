import { type Event, Category, Subject } from '@eventapp/modules/event';

export interface EventForm {
  name: string;
  description: string;
  capacity: number;
  image: File;
  subject: Subject;
  category: Category;
  address: Event['address'];
  tickets: Event['tickets'];
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}