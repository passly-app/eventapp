import Icon from '@iziui/react/Icon';
import Stack from '@iziui/react/Stack';
import Button from '@iziui/react/Button';
import Divider from '@iziui/react/Divider';
import Typography from '@iziui/react/Typography';
import { Card, CardContent } from '@iziui/react/Card';

interface ReviewSectionProps {
  icon: string;
  title: string;
  subtitle?: string;
  onEdit?: () => void;
  children: React.ReactNode;
}

export default function ReviewSection({
  icon,
  title,
  subtitle,
  onEdit,
  children,
}: ReviewSectionProps) {
  return (
    <Card fullWidth>
      <CardContent>
        <Stack>
          <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
            <Stack
              gap={8}
              flexDirection="row"
              alignItems="center"
              style={{ width: 'fit-content' }}
            >
              <Icon name={icon} color="primary" />
              <Stack gap={0}>
                <Typography weight="bold">{title}</Typography>
                {
                  subtitle && (
                    <Typography variant="body2" color="text.secondary">
                      {subtitle}
                    </Typography>
                  )
                }
              </Stack>
            </Stack>
            {
              onEdit && (
                <Button
                  variant="text"
                  color="grey"
                  startIcon={<Icon name="pen" />}
                  onClick={onEdit}
                >
                  Editar
                </Button>
              )
            }
          </Stack>
          <Divider />
          {children}
        </Stack>
      </CardContent>
    </Card >
  );
}
