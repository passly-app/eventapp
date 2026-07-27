import Icon from '@iziui/react/Icon';
import Stack from '@iziui/react/Stack';
import Typography from '@iziui/react/Typography';

interface ReviewItemProps {
  label: string;
  icon?: string;
  value?: React.ReactNode;
}

export default function ReviewItem({ label, icon, value }: ReviewItemProps) {
  return (
    <Stack gap={4}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Stack flexDirection="row" alignItems="center" gap={8}>
        {icon && <Icon name={icon} color="grey" />}
        <Typography>{value || '-'}</Typography>
      </Stack>
    </Stack>
  );
}
