import { useState } from 'react';

import Alert from '@iziui/react/Alert';
import Input from '@iziui/react/Input';
import Stack from '@iziui/react/Stack';
import Switch from '@iziui/react/Switch';
import Typography from '@iziui/react/Typography';
import { Grid, GridItem } from '@iziui/react/Grid';
import type { FormGroup } from '@iziui/react/lab/Form';

import type { Event } from '@eventapp/modules/event';

type TicketLimit = Event['tickets'][number]['limits'];

interface EventTicketFormLimitProps {
  formGroup: FormGroup<Event['tickets'][number]>;
  onChange: <K extends keyof TicketLimit, T extends TicketLimit[K]>
    (key: K, value: T) => void;
}

export default function EventTicketFormLimit({
  formGroup,
  onChange
}: EventTicketFormLimitProps) {
  const { min, max } = formGroup.values.limits;

  const [shouldLimit, setShouldLimit] = useState(min > 0 || max > 0);

  const handleToggle = () => { setShouldLimit(prev => !prev); };

  return (
    <Alert
      sx={{
        background: ({ background }) => background.muted,
      }}
    >
      <Stack>
        <Stack flexDirection="row" alignItems="flex-start" justifyContent="space-between">
          <Stack gap={0}>
            <Typography variant="body1" color="text.secondary" style={{ fontSize: 14 }}>
              Limitar quantidade por compra
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ fontSize: 12 }}>
              Defina quantos ingressos uma pessoa pode selecionar em uma única compra.
            </Typography>
          </Stack>
          <Switch
            checked={shouldLimit}
            onChange={handleToggle}
            color="secondary"
          />
        </Stack>
        {
          shouldLimit && (
            <Grid xl={6} sm={12}>
              <GridItem>
                <Input
                  value={min}
                  type="tel"
                  label="Mínimo por compra"
                  placeholder="Ex: 1"
                  error={formGroup.controls.limits.isInvalid}
                  helperText={formGroup.controls.limits.error}
                  onInput={(e) => onChange('min', Number(e.target['value']))}
                />
              </GridItem>
              <GridItem>
                <Input
                  value={max}
                  type="tel"
                  label="Máximo por compra"
                  placeholder="Ex: 5"
                  error={formGroup.controls.limits.isInvalid}
                  helperText={formGroup.controls.limits.error}
                  onInput={(e) => onChange('max', Number(e.target['value']))}
                />
              </GridItem>
            </Grid>
          )
        }
      </Stack>
    </Alert>
  );
}