import { useNavigate } from 'react-router-dom';

import Button from '@iziui/react/Button';
import Chip from '@iziui/react/Chip';
import Icon from '@iziui/react/Icon';
import Stack from '@iziui/react/Stack';
import Typography from '@iziui/react/Typography';
import { Slide } from '@iziui/react';
import { getOpacityColor, getLinearGradient } from '@iziui/react/core';

import './Home.scss';

export default function Home() {
  const navigate = useNavigate();

  const goToCreateEvent = () => {
    navigate('/criar-evento');
  };

  return (
    <Slide enter>
      <Stack gap={24}>
        <Stack
          className="ea-page-home"
          gap={12}
          sx={{
            borderRadius: 2,
            background: ({ secondary }) => getLinearGradient(secondary.main)
          }}
        >
          <Chip
            label="Plataforma de eventos"
            icon={<Icon name="calendar-alt" />}
            sx={{
              color: ({ primary }) => primary.contrast,
              borderColor: ({ primary }) => getOpacityColor(primary.contrast, .2),
              backgroundColor: ({ primary }) => getOpacityColor(primary.contrast, .2),
            }}
          />
          <Typography variant="h3" color="primary.contrast">
            Descubra, crie e viva <br /> experiências inesquecíveis.
          </Typography>
          <Typography color="primary.contrast">
            Compre ingressos em poucos cliques ou publique seu próprio evento agora mesmo.
          </Typography>
          <Button
            onClick={goToCreateEvent}
            endIcon={<Icon name="arrow-right" />}
            sx={{
              backgroundColor: ({ primary }) => primary.contrast,
              color: ({ text }) => text.primary
            }}
          >
            Criar evento
          </Button>
        </Stack>
        <Stack gap={0}>
          <Typography variant="h4">Próximos eventos</Typography>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            4 eventos disponíveis
          </Typography>
        </Stack>
      </Stack>
    </Slide>
  );
}