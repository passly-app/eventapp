import Stack from '@iziui/react/Stack';
import InputFile from '@iziui/react/InputFile';
import Typography from '@iziui/react/Typography';
import { useControl } from '@iziui/react/lab/Form';
import Slide from '@iziui/react/animations/Slide';
import Icon from '@iziui/react/Icon';

import './EventImageInput.scss';

export default function EventImageInput() {
  const { control, update } = useControl('image');

  const success = Boolean(control.value.length);

  const handleChange = (files: File[]) => {
    if (!files.length) { return; }
    update(files);
  };

  const handleDelete = () => {
    update([]);
  };

  return (
    <Stack gap={5}>
      <Typography variant="body2" style={{ fontSize: 12 }}>
        Imagem de divulgação (opcional)
      </Typography>
      {
        !success && (
          <Slide enter>
            <InputFile
              files={control.value}
              success={success}
              helperText={success ? 'Arquivo adicionado' : 'Erro ao adicionar arquivo'}
              placeholder="Clique ou arraste a imagem aqui"
              onChange={handleChange}

            />
          </Slide>
        )
      }
      {
        success && (
          <Slide enter>
            <Stack onClick={handleDelete}>
              <div
                className="ea-event-image-input"
                style={{
                  backgroundImage: `url(${URL.createObjectURL(control.value[0])})`,
                }}
              >
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  className="ea-event-image-input__delete"
                >
                  <Icon size={50} name="trash" />
                </Stack>
              </div>
            </Stack>
          </Slide>
        )
      }
    </Stack>
  );
}