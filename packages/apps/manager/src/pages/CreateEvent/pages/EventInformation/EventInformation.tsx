import Stack from '@iziui/react/Stack';
import Input from '@iziui/react/Input';
import Slide from '@iziui/react/animations/Slide';
import Typography from '@iziui/react/Typography';
import { Select, Option } from '@iziui/react/Select';
import { Control, Form } from '@iziui/react/lab/Form';
import { Card, CardContent } from '@iziui/react/Card';
import Button from '@iziui/react/Button';

import { Subject, Category } from '@eventapp/modules/event';

import { useTranslate } from '@/locales';

import { useEventForm } from '../../hook';
import EventImageInput from './components/EventImageInput';

export default function EventInformation() {
  const { t } = useTranslate();
  const { formGroup } = useEventForm();

  return (
    <Stack justifyContent="space-between" style={{ height: '100%' }}>
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
                  <Select
                    placeholder="Selecione o assunto"
                    label="Assunto"
                    position="top"
                  >
                    {
                      Object
                        .values(Subject)
                        .filter((value) => typeof value === 'string')
                        .map(s => (
                          <Option key={s} value={s}>
                            {t(`SUBJECTS.${s as keyof typeof Subject}`)}
                          </Option>
                        ))
                    }
                  </Select>
                  <Select
                    placeholder="Selecione a categoria"
                    label="Categoria"
                    position="top"
                  >
                    {
                      Object
                        .values(Category)
                        .filter((value) => typeof value === 'string')
                        .map(s => (
                          <Option key={s} value={s}>
                            {t(`CATEGORIES.${s as keyof typeof Category}`)}
                          </Option>
                        ))
                    }
                  </Select>
                </Stack>
              </Form>
            </Stack>
          </CardContent>
        </Card>
      </Slide>
      <Stack
        flexDirection="row"
        justifyContent="flex-end"
        style={{
          borderTopStyle: 'solid',
          borderTopWidth: '1px',
        }}
        sx={{
          p: 2,
          borderColor: ({ divider }) => divider,
          background: ({ background }) => background.default,
        }}
      >
        <Button>Próximo</Button>
      </Stack>
    </Stack>
  );
}