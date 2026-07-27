import { useMemo } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import Stack from '@iziui/react/Stack';
import Divider from '@iziui/react/Divider';
import Typography from '@iziui/react/Typography';
import Slide from '@iziui/react/animations/Slide';
import { Card, CardContent } from '@iziui/react/Card';

import { formatDate } from '@eventapp/toolkit/date';

import { Subject, Category } from '@eventapp/modules/event';

import { useTranslate } from '@/locales';

import ReviewItem from './components/ReviewItem';
import ReviewTicket from './components/ReviewTicket';
import ReviewSection from './components/ReviewSection';
import { useEventForm } from '../../components/EventForm';
import { FormatIntervalDate } from '../EventDate/formatIntervalDate';

const STEPS = {
  information: 'informacoes-basicas',
  date: 'data-hora',
  location: 'localizacao',
  tickets: 'ingressos',
} as const;

function formatDateTime(date: string, time: string) {
  return formatDate(new Date(`${date}T${time}`), {
    locale: 'pt-BR',
    options: {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
  });
}

export default function EventReview() {
  const params = useParams();
  const navigate = useNavigate();

  const { t } = useTranslate();

  const { formGroup } = useEventForm();

  const {
    name,
    image,
    subject,
    category,
    address,
    description,
    tickets = [],
    startDate,
    startTime,
    endDate,
    endTime,
  } = formGroup.values;

  const imageUrl = useMemo(
    () => (image instanceof File ? URL.createObjectURL(image) : undefined),
    [image]
  );

  // useEffect(() => {
  //   return () => {
  //     if (!imageUrl) { return; }

  //     return URL.revokeObjectURL(imageUrl);
  //   };
  // }, [imageUrl]);

  const period = useMemo(() => {
    if (!startDate || !startTime || !endDate || !endTime) { return null; }

    return {
      start: formatDateTime(startDate, startTime),
      end: formatDateTime(endDate, endTime),
      duration: FormatIntervalDate({ startDate, startTime, endDate, endTime }),
    };
  }, [startDate, startTime, endDate, endTime]);

  const goToStep = (step: string) => {
    const path = params.eventId
      ? generatePath(`/editar-evento/:eventId/${step}`, { eventId: params.eventId })
      : generatePath(`/criar-evento/${step}`);

    navigate(path);
  };

  return (
    <Slide enter style={{ height: '100%' }}>
      <Stack>
        <Card fullWidth>
          <CardContent>
            <Stack gap={0}>
              <Typography weight="bold">Tudo certo?</Typography>
              <Typography variant="body2" color="text.secondary">
                Revise as informações abaixo antes de publicar seu evento
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <ReviewSection
          icon="notes"
          title="O que é?"
          subtitle="Nome e descrição do evento"
          onEdit={() => goToStep(STEPS.information)}
        >
          {
            imageUrl && (
              <img
                src={imageUrl}
                alt="Capa do evento"
                loading="lazy"
                style={{
                  width: '100%',
                  maxHeight: 200,
                  borderRadius: 'var(--radius)',
                  objectFit: 'cover',
                }}
              />
            )
          }
          <ReviewItem label="Nome do evento" value={name} />
          <ReviewItem label="Descrição" value={description} />
          <ReviewItem
            label="Assunto"
            value={subject && t(`SUBJECTS.${subject as unknown as keyof typeof Subject}`)}
          />
          <ReviewItem
            label="Categoria"
            value={category && t(`CATEGORIES.${category as unknown as keyof typeof Category}`)}
          />
        </ReviewSection>

        <ReviewSection
          icon="calendar-alt"
          title="Quando?"
          subtitle="Data e hora do evento"
          onEdit={() => goToStep(STEPS.date)}
        >
          <ReviewItem label="Início" icon="schedule" value={period?.start} />
          <ReviewItem label="Término" icon="schedule" value={period?.end} />
          <ReviewItem label="Duração" value={period?.duration} />
        </ReviewSection>

        <ReviewSection
          icon="map-marker"
          title="Onde?"
          subtitle="Local onde o evento vai acontecer"
          onEdit={() => goToStep(STEPS.location)}
        >
          <ReviewItem
            icon="map-marker"
            label="Endereço"
            value={address?.description ?? address?.name}
          />
        </ReviewSection>

        <ReviewSection
          icon="ticket"
          title="Ingressos"
          subtitle="Ingressos disponíveis para o evento"
          onEdit={() => goToStep(STEPS.tickets)}
        >
          {
            tickets.length === 0 && (
              <Typography color="text.secondary">
                Nenhum ingresso adicionado
              </Typography>
            )
          }
          <Stack>
            {
              tickets.map((ticket, index) => (
                <Stack key={ticket.id}>
                  <ReviewTicket ticket={ticket} index={index} />
                  {index < tickets.length - 1 && <Divider />}
                </Stack>
              ))
            }
          </Stack>
        </ReviewSection>
      </Stack>
    </Slide>
  );
}
