import Stack from '@iziui/react/Stack';
import Input from '@iziui/react/Input';
import Slide from '@iziui/react/animations/Slide';
import Typography from '@iziui/react/Typography';
import { Control, Form } from '@iziui/react/lab/Form';
import { Card, CardContent } from '@iziui/react/Card';

import { useEventForm } from '../../hook';
import EventImageInput from './components/EventImageInput';

export default function EventInformation() {
  const { formGroup } = useEventForm();

  return (
    <Stack>
      <Slide enter>
        <Card fullWidth>
          <CardContent>
            <Stack>
              <Stack flexDirection="row">
                <Stack gap={0}>
                  <Typography>O que é?</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Nome e descrição do evento
                  </Typography>
                </Stack>
              </Stack>
              <Form formGroup={formGroup}>
                <Stack>
                  <Control
                    controlName="name"
                    field={(control) => (
                      <Input
                        label="Nome do evento"
                        placeholder="Ex: Festival de Verão"
                        value={control.value}
                        error={control.isInvalid}
                        helperText={control.error}
                      />
                    )}
                  />
                  <EventImageInput />
                </Stack>
              </Form>
            </Stack>
          </CardContent>
        </Card>
      </Slide>
    </Stack>
  );
}