import Stack from '@iziui/react/Stack';
import Input from '@iziui/react/Input';
import Slide from '@iziui/react/animations/Slide';
import Typography from '@iziui/react/Typography';
import { Select, Option } from '@iziui/react/Select';
import { Control, Form } from '@iziui/react/lab/Form';
import { Card, CardContent } from '@iziui/react/Card';

import { Subject, Category } from '@eventapp/modules/event';

import { useTranslate } from '@/locales';

import EventImageInput from './components/EventImageInput';
import { useEventForm } from '../../components/EventForm';

export default function EventInformation() {
  const { t } = useTranslate();

  const { formGroup } = useEventForm();

  return (
    <Slide enter>
      <Card fullWidth>
        <CardContent>
          <Stack>
            <Stack gap={0}>
              <Typography weight="bold">O que é?</Typography>
              <Typography variant="body2" color="text.secondary">
                Nome e descrição do evento
              </Typography>
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
  );
}