import Stack from '@iziui/react/Stack';
import Input from '@iziui/react/Input';
import Typography from '@iziui/react/Typography';
import Slide from '@iziui/react/animations/Slide';
import { useTheme } from '@iziui/react/theme';
import { Grid, GridItem } from '@iziui/react/Grid';
import { Control, Form } from '@iziui/react/lab/Form';
import { Card, CardContent } from '@iziui/react/Card';

import { useEventForm } from '../../components/EventForm';

export default function EventDate() {
  const { theme: { palette } } = useTheme();

  const { formGroup } = useEventForm();

  return (
    <Slide enter style={{ height: '100%' }}>
      <Card fullWidth>
        <CardContent>
          <Stack>
            <Stack gap={0}>
              <Typography weight="bold">Quando?</Typography>
              <Typography variant="body2" color="text.secondary">
                Data e hora do evento
              </Typography>
            </Stack>
            <Form formGroup={formGroup}>
              <Grid lg={6} sm={12}>
                <GridItem>
                  <Control
                    controlName="startDate"
                    field={(control) => (
                      <Input
                        type="date"
                        label="Data de início"
                        value={control.value}
                        error={control.isInvalid}
                        helperText={control.error}
                      />
                    )}
                  />
                </GridItem>
                <GridItem>
                  <Control
                    controlName="startTime"
                    field={(control) => (
                      <Input
                        type="time"
                        label="Hora de início"
                        value={control.value}
                        error={control.isInvalid}
                        helperText={control.error}
                      />
                    )}
                  />
                </GridItem>
                <GridItem>
                  <Control
                    controlName="endDate"
                    field={(control) => (
                      <Input
                        type="date"
                        label="Data de término"
                        value={control.value}
                        error={control.isInvalid}
                        helperText={control.error}
                      />
                    )}
                  />
                </GridItem>
                <GridItem>
                  <Control
                    controlName="endTime"
                    field={(control) => (
                      <Input
                        type="time"
                        label="Hora de término"
                        value={control.value}
                        error={control.isInvalid}
                        helperText={control.error}
                      />
                    )}
                  />
                </GridItem>
              </Grid>
            </Form>
            <Typography color="text.secondary">
              Seu evento vai durar
              <strong
                style={{
                  marginLeft: 5,
                  color: palette.secondary.main
                }}
              >
                2 dias
              </strong>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Slide>
  );
}
