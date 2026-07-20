import { useState } from 'react';

import Alert from '@iziui/react/Alert';
import Input from '@iziui/react/Input';
import Stack from '@iziui/react/Stack';
import Switch from '@iziui/react/Switch';
import Typography from '@iziui/react/Typography';
import { Grid, GridItem } from '@iziui/react/Grid';

export default function EventTicketFormLimit() {
  const [shouldLimit, setShouldLimit] = useState(false);

  const handleToggle = () => {
    setShouldLimit(prev => !prev);
  };

  return (
    <Alert
      sx={{
        background: ({ grey }) => grey.opacity,
      }}
    >
      <Stack>
        <Stack flexDirection="row" alignItems="flex-start" justifyContent="space-between">
          <Stack gap={0}>
            <Typography variant="body1" weight="bold">
              Limitar quantidade por compra
            </Typography>
            <Typography variant="body2">
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
            <Grid>
              <GridItem lg={6} sm={12}>
                <Input
                  type="number"
                  label="Mínimo por compra"
                  placeholder="Ex: 1"
                />
              </GridItem>
              <GridItem lg={6} sm={12}>
                <Input
                  type="number"
                  label="Máximo por compra"
                  placeholder="Ex: 5"
                />
              </GridItem>
            </Grid>
          )
        }
      </Stack>
    </Alert>
  );
}