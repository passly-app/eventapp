import Icon from '@iziui/react/Icon';
import Stack from '@iziui/react/Stack';
import Input from '@iziui/react/Input';
import Alert from '@iziui/react/Alert';
import Textarea from '@iziui/react/Textarea';
import Typography from '@iziui/react/Typography';
import ButtonIcon from '@iziui/react/ButtonIcon';
import Slide from '@iziui/react/animations/Slide';
import { Grid, GridItem } from '@iziui/react/Grid';
import { Card, CardContent } from '@iziui/react/Card';

import { maskCurrency, sanitizeOnlyNumbers } from '@eventapp/toolkit/mask';

import type { Event } from '@eventapp/modules/event';

import useTicketForm from './useTicketForm';
import EventTicketFormType from './EventTicketFormType';
import EventTicketFormLimit from './EventTicketFormLimit';
import EventTicketFormHeader from './EventTicketFormHeader';

import './EventTicketForm.scss';

interface EventTicketFormProps<E extends Event['tickets'][number]> {
  index: number;
  ticket: E;
  onDelete: (id: string) => void;
  onCopy: (id: string) => void;
  onChange: (value: Event['tickets'][number]) => void;
}

export default function EventTicketForm<
  E extends Event['tickets'][number]
>({
  index,
  ticket,
  onCopy,
  onDelete,
  onChange
}: EventTicketFormProps<E>) {
  const TAX = 0.1;

  const ticketFormGroup = useTicketForm(ticket, onChange);

  const handleCopy = () => { onCopy(ticket.id); };
  const handleDelete = () => { onDelete(ticket.id); };

  const handleType = (isFree: boolean) => {
    if (isFree) {
      ticketFormGroup.controls.value.reset();
    }

    ticketFormGroup.setValues({ free: isFree });
  };

  return (
    <Card fullWidth className="event-ticket-form">
      <CardContent>
        <Stack>
          <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
            <EventTicketFormHeader ticket={ticket} index={index} />
            <Stack flexDirection="row" justifyContent="flex-end">
              <ButtonIcon type="button" color="grey" size={32} onClick={handleCopy}>
                <Icon name="copy" />
              </ButtonIcon>
              <ButtonIcon type="button" color="grey" size={32} onClick={handleDelete}>
                <Icon name="trash" />
              </ButtonIcon>
            </Stack>
          </Stack>
          <Input
            label="Nome do ingresso"
            placeholder="Ex: Pista, VIP ou Meia-entrada"
            value={ticketFormGroup.values.name}
            error={ticketFormGroup.controls.name.isInvalid}
            helperText={ticketFormGroup.controls.name.error}
            onChange={(e) => ticketFormGroup.setValues({ name: e.target.value })}
          />
          <EventTicketFormType
            isFree={ticketFormGroup.values.free}
            onChange={(isFree) => handleType(isFree)}
          />
          <Grid>
            <GridItem xl={6} sm={12}>
              <Input
                type="tel"
                placeholder="Ex: 100"
                label="Quantidade de ingressos"
                value={ticketFormGroup.values.count}
                error={ticketFormGroup.controls.count.isInvalid}
                helperText={ticketFormGroup.controls.count.error}
                onChange={(e) => ticketFormGroup.setValues({ count: Number(e.target.value) })}
              />
            </GridItem>
            {
              !ticketFormGroup.values.free && (
                <GridItem xl={6} sm={12}>
                  <Slide enter>
                    <Input
                      type="tel"
                      label="Preço"
                      placeholder="R$ 0,00"
                      value={maskCurrency(ticketFormGroup.values.value)}
                      error={ticketFormGroup.controls.value.isInvalid}
                      helperText={ticketFormGroup.controls.value.error}
                      onChange={(e) => ticketFormGroup.setValues({
                        value: Number(sanitizeOnlyNumbers(e.target.value))
                      })}
                    />
                  </Slide>
                </GridItem>
              )
            }
            {
              Boolean(ticketFormGroup.values.value) && (
                <GridItem xl={12}>
                  <Slide enter>
                    <Alert color="info" icon={<Icon name="info-circle" />}>
                      <Typography variant="body2">
                        Taxa de serviço de {maskCurrency(ticketFormGroup.values.value * TAX)} por ingresso vendido
                      </Typography>
                    </Alert>
                  </Slide>
                </GridItem>
              )
            }
          </Grid>
          <Textarea
            label="Descrição (opcional)"
            placeholder="Conte o que está incluso nesse ingresso"
            helperText="0/240 caracteres"
            value={ticketFormGroup.values.description}
            onChange={(e) => ticketFormGroup.setValues({ description: e.target.value })}
          />
          <EventTicketFormLimit
            formGroup={ticketFormGroup}
            onChange={(key, value) => ticketFormGroup.setValues({
              limits: { ...ticketFormGroup.values.limits, [key]: value }
            })}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}