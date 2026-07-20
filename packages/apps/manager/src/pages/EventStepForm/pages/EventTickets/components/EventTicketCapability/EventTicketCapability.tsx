import Stack from '@iziui/react/Stack';
import Typography from '@iziui/react/Typography';
import { Card, CardContent } from '@iziui/react/Card';
import Input from '@iziui/react/Input';

export default function EventTicketCapability() {
  return (
    <Stack>
      <Stack gap={4}>
        <Typography variant="h3">
          Configure os ingressos
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Defina a capacidade do evento e crie os ingressos que estarão disponíveis para os participantes.
        </Typography>
      </Stack>
      <Card fullWidth>
        <CardContent>
          <Stack>
            <Stack gap={4}>
              <Typography variant="subtitle1">
                Capacidade do evento
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quantidade máxima de participantes permitida neste evento.
              </Typography>
            </Stack>
            <Input
              label="Lotação máxima"
              placeholder="Ex: 200"
              width={250}
              type="number"
            />
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}