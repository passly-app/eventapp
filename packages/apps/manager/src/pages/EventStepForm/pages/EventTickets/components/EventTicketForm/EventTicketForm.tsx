import Icon from '@iziui/react/Icon';
import Chip from '@iziui/react/Chip';
import Stack from '@iziui/react/Stack';
import Input from '@iziui/react/Input';
import Alert from '@iziui/react/Alert';
import Divider from '@iziui/react/Divider';
import Textarea from '@iziui/react/Textarea';
import Slide from '@iziui/react/animations/Slide';
import Typography from '@iziui/react/Typography';
import ButtonIcon from '@iziui/react/ButtonIcon';
import { Grid, GridItem } from '@iziui/react/Grid';
import { Card, CardContent } from '@iziui/react/Card';

import { maskCurrency, sanitizeOnlyNumbers } from '@eventapp/toolkit/mask';

import type { Event } from '@eventapp/modules/event';

interface EventTicketFormProps<E extends Event['tickets'][number]> {
  index: number;
  ticket: E;
  onChange: <
    K extends keyof E,
    T extends E[K]
  >(key: K, index: number, value: T) => void;
  onDelete: (id: string) => void;
  onCopy: (id: string) => void;
}

export default function EventTicketForm<
  E extends Event['tickets'][number]
>({
  index,
  ticket,
  onCopy,
  onChange,
  onDelete,
}: EventTicketFormProps<E>) {
  const handleChange = <
    K extends keyof E,
    T extends E[K]
  >(key: K, value: T) => { onChange(key, index, value); };

  const handleCopy = () => { onCopy(ticket.id); };
  const handleDelete = () => { onDelete(ticket.id); };

  return (
    <Card fullWidth>
      <CardContent>
        <Stack>
          <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
            <Typography fullWidth variant="body2" color="text.secondary">
              Ingresso {index + 1}
            </Typography>
            <Stack flexDirection="row" justifyContent="flex-end">
              <ButtonIcon color="error" size={32} onClick={handleDelete}>
                <Icon name="trash" />
              </ButtonIcon>
              <ButtonIcon color="grey" size={32} onClick={handleCopy}>
                <Icon name="copy" />
              </ButtonIcon>
            </Stack>
          </Stack>
          <Input
            label="Nome do ingresso"
            value={ticket.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <Grid lg={6}>
            <GridItem alignSelf="flex-end">
              <Stack gap={8} style={{ marginBottom: 16 }}>
                <Typography variant="body2" style={{ fontSize: 12 }}>
                  Tipo de ingresso
                </Typography>
                <Stack flexDirection="row">
                  <Chip
                    fullWidth
                    size="large"
                    label="Pago"
                    color="secondary"
                    variant={!ticket.free ? 'contained' : 'outlined'}
                    onClick={() => handleChange('free', false)}
                    style={{ fontSize: 14 }}
                  />
                  <Chip
                    fullWidth
                    size="large"
                    label="Gratuito"
                    color="secondary"
                    variant={ticket.free ? 'contained' : 'outlined'}
                    onClick={() => handleChange('free', true)}
                    style={{ fontSize: 14 }}
                  />
                </Stack>
              </Stack>
            </GridItem>
            <GridItem style={{ minHeight: 71 }}>
              <Slide enter={!ticket.free} direction="bottom">
                <Input
                  label="Preço"
                  value={maskCurrency(ticket.value)}
                  onChange={(e) => handleChange('value', Number(sanitizeOnlyNumbers(e.target.value)))}
                />
              </Slide>
            </GridItem>
            <GridItem lg={12}>
              <Alert color="grey" style={{ boxShadow: 'none' }}>
                <Stack gap={4}>
                  <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2">Valor a receber:</Typography>
                    <Typography variant="body2">{maskCurrency(ticket.value)}</Typography>
                  </Stack>
                  <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2">Taxa:</Typography>
                    <Typography variant="body2">{maskCurrency(ticket.value * 0.1)}</Typography>
                  </Stack>
                  <Divider />
                  <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2">Valor final para o participante:</Typography>
                    <Typography variant="body2">{maskCurrency(ticket.value * 1.1)}</Typography>
                  </Stack>
                </Stack>
              </Alert>
            </GridItem>
            <GridItem lg={12}>
              <Input
                type="tel"
                label="Quantidade disponível"
                placeholder="Ex: 100"
                value={!ticket.count ? '' : ticket.count}
                onChange={(e) => handleChange('count', Number(e.target.value))}
              />
            </GridItem>
            <GridItem lg={12}>
              <Textarea
                label="Descrição (opcional)"
                value={!ticket.count ? '' : ticket.count}
                onChange={(e) => handleChange('count', Number(e.target.value))}
              />
            </GridItem>
            <GridItem>
              <Input
                type="tel"
                label="Mínimo por compra"
                placeholder="Ex: 1"
                value={ticket.limits.min}
                onChange={(e) => handleChange('limits', { ...ticket.limits, min: Number(e.target.value) })}
              />
            </GridItem>
            <GridItem>
              <Input
                type="tel"
                label="Máximo por compra"
                placeholder="Ex: 5"
                value={ticket.limits.max}
                onChange={(e) => handleChange('limits', { ...ticket.limits, max: Number(e.target.value) })}
              />
            </GridItem>
          </Grid>
        </Stack>
      </CardContent>
    </Card >
  );
}