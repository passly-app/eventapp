import Icon from '@iziui/react/Icon';
import Stack from '@iziui/react/Stack';
import Typography from '@iziui/react/Typography';

export default function StatsSlot() {
  return (
    <Stack flexDirection="row" gap={8}>
      <Stack flexDirection="row" alignItems="center" gap={8} style={{ width: 'fit-content' }}>
        <Icon size={16} name="ticket" />
        <Stack flexDirection="row" alignItems="flex-end" gap={4}>
          <Typography weight="bold">4.250</Typography>
          <Typography variant="body2">vendidos</Typography>
        </Stack>
      </Stack>
      <Stack flexDirection="row" alignItems="center" gap={8}>
        <Icon size={16} name="eye" />
        <Stack flexDirection="row" alignItems="flex-end" gap={4}>
          <Typography weight="bold">1000</Typography>
          <Typography variant="body2">views</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}