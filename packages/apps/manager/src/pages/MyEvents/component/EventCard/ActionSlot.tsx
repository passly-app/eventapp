import Icon from '@iziui/react/Icon';
import Stack from '@iziui/react/Stack';
import Button from '@iziui/react/Button';

interface ActionSlotProps {
  goToEvent: () => void;
}

export default function ActionSlot({ goToEvent }: ActionSlotProps) {
  return (
    <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
      <Stack flexDirection="row">
        <Button
          fullWidth
          color="grey"
          variant="outlined"
          startIcon={<Icon name="edit" />}
          onClick={goToEvent}
        >
          Editar
        </Button>
        <Button
          fullWidth
          startIcon={<Icon name="external-link-alt" />}
        >
          Ver evento
        </Button>
      </Stack>
    </Stack>
  );
}