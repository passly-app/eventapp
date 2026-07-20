import { useEffect, useMemo, type ButtonHTMLAttributes } from 'react';

import Box from '@iziui/react/Box';
import Stack from '@iziui/react/Stack';
import Typography from '@iziui/react/Typography';
import useListenerResized from '@iziui/react/hooks/useListenerResized';

import { uuid } from '@eventapp/toolkit/uuid';

interface TypeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  description: string;
}

function TypeButton({ title, description, ...props }: TypeButtonProps) {
  return (
    <Stack
      gap={0}
      tag="button"
      type="button"
      style={{ border: 'none' }}
      className="event-ticket-form__type__button"
      sx={{ borderRadius: 1.5 }}
      {...props}
    >
      <Typography>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Stack>
  );
}

interface EventTicketFormTypeProps {
  isFree: boolean;
  onChange: (isFree: boolean) => void;
}

export default function EventTicketFormType({ isFree, onChange }: EventTicketFormTypeProps) {
  const id = useMemo(() => `marker-${uuid()}`, []);

  useListenerResized(() => setBorderLine(isFree), []);

  useEffect(() => { setBorderLine(isFree); }, [isFree]);

  const setBorderLine = (_isFree: boolean) => {
    const label = `ticket-type-button-${_isFree ? 'free' : 'not-free'}`;

    const element = document.querySelector(`#${label}`) as HTMLElement;
    const el = document.getElementById(id) as HTMLElement;

    const width = element['offsetWidth'];
    const left = element['offsetLeft'];

    el.style.width = `${width}px`;
    el.style.left = `${left}px`;
  };

  return (
    <Stack
      alignItems="center"
      flexDirection="row"
      className="event-ticket-form__type"
      sx={{
        borderRadius: 1,
        background: ({ grey }) => grey.opacity,
      }}
    >
      <Box
        id={id}
        className="event-ticket-form__type__marker"
      />
      <TypeButton
        title="Gratuito"
        description="Sem cobrança"
        id="ticket-type-button-free"
        onClick={() => onChange(true)}
      />
      <TypeButton
        title="Pago"
        description="Definir valor"
        id="ticket-type-button-not-free"
        onClick={() => onChange(false)}
      />
    </Stack>
  );
}