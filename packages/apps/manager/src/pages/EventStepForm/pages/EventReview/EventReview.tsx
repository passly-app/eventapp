import Stack from '@iziui/react/Stack';
import Typography from '@iziui/react/Typography';
import Slide from '@iziui/react/animations/Slide';
import { Card, CardContent } from '@iziui/react/Card';

export default function EventReview() {
  return (
    <Slide enter style={{ height: '100%' }}>
      <Card fullWidth>
        <CardContent>
          <Stack>
            <Stack gap={0}>
              <Typography weight="bold">Onde?</Typography>
              <Typography variant="body2" color="text.secondary">
                Onde seu evento vai acontecer?
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Slide>
  );
}
