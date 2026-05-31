import { Timestamp } from 'firebase/firestore';

export function convertDate(date: Date) {
  return Timestamp.fromDate(date);
}