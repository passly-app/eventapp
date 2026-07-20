import { pluralize } from '@eventapp/toolkit/string';

interface FormatIntervalDateProps {
  startDate: Date;
  startTime: Date;
  endDate: Date;
  endTime: Date;
}

export function FormatIntervalDate({
  startDate,
  startTime,
  endDate,
  endTime,
}: FormatIntervalDateProps) {
  const start = new Date(`${startDate}T${startTime}`);
  const end = new Date(`${endDate}T${endTime}`);

  const diffMs = end.getTime() - start.getTime();

  if (Number.isNaN(diffMs) || diffMs <= 0) {
    return '-';
  }

  const totalMinutes = Math.round(diffMs / (1000 * 60));

  const weeks = Math.floor(totalMinutes / (7 * 24 * 60));
  const days = Math.floor((totalMinutes % (7 * 24 * 60)) / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = totalMinutes % 60;

  const parts = [
    { value: weeks, singular: 'semana', plural: 'semanas' },
    { value: days, singular: 'dia', plural: 'dias' },
    { value: hours, singular: 'hora', plural: 'horas' },
    { value: minutes, singular: 'minuto', plural: 'minutos' },
  ]
    .filter((part) => part.value > 0)
    .map((part) => pluralize(part.value, part.singular, part.plural));

  if (parts.length === 0) {
    return '-';
  }

  // Show at most the two most significant units (e.g. "1 hora e 30 minutos")
  return parts.slice(0, 2).join(' e ');
}