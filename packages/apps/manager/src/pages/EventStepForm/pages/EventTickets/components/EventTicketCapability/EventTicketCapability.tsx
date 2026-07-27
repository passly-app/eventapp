import Stack from '@iziui/react/Stack';
import Typography from '@iziui/react/Typography';
import { Card, CardContent } from '@iziui/react/Card';
import Input from '@iziui/react/Input';

interface EventTicketCapabilityProps {
  value?: number;
  error?: boolean;
  helperText?: string;
  onChange: (value: number) => void;
}

export default function EventTicketCapability({
  value,
  error,
  helperText,
  onChange
}: EventTicketCapabilityProps) {
  return (
    <Stack>
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
              width={250}
              type="number"
              label="Lotação máxima"
              placeholder="Ex: 200"
              value={value}
              error={error}
              helperText={helperText}
              onChange={(e) => onChange(Number(e.target.value))}
            />
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}