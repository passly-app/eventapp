import { useEffect, useState } from 'react';

import Icon from '@iziui/react/Icon';
import Stack from '@iziui/react/Stack';
import Input from '@iziui/react/Input';
import Button from '@iziui/react/Button';
import Loading from '@iziui/react/Loading';
import Typography from '@iziui/react/Typography';
import { Grid, GridItem } from '@iziui/react/Grid';

import { wait } from '@eventapp/toolkit/promise';

import { useAuth } from '@eventapp/modules/auth';
import { useEvent } from '@eventapp/modules/event';

import EventCard from './component/EventCard';

export default function MyEvents() {
  const { user } = useAuth();
  const { myEvents, getMyEvents } = useEvent();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) { return; }

    getMyEvents(user.id)
      .finally(() => {
        wait(() => setLoading(false), 500);
      });
  }, [user]);

  return (
    <Stack>
      <Stack gap={4}>
        <Typography variant="h4">Meus eventos</Typography>
        <Typography variant="body2" color="text.secondary">
          Eventos que vocë publicou
        </Typography>
      </Stack>
      {
        loading && (
          <Stack justifyContent="center" alignItems="center">
            <Loading />
          </Stack>
        )
      }
      {
        !loading && (
          <Stack>
            <Grid>
              <GridItem xl={10} sm={7}>
                <Input
                  placeholder="Buscar por nome..."
                  startIcon={<Icon size={20} name="search" color="grey" />}
                />
              </GridItem>
              <GridItem xl={2} sm={5}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Icon name="filter" />}
                >
                  Filtros
                </Button>
              </GridItem>
            </Grid>
            <Grid xl={4} md={6} sm={12}>
              {
                myEvents.map(event => (
                  <GridItem key={event.id}>
                    <EventCard
                      event={event}
                    />
                  </GridItem>
                ))
              }
            </Grid>
          </Stack>
        )
      }
    </Stack>
  );
}