import { useEffect, useState } from 'react';

import Stack from '@iziui/react/Stack';
import Loading from '@iziui/react/Loading';
import Typography from '@iziui/react/Typography';
import { Grid, GridItem } from '@iziui/react/Grid';

import { wait } from '@eventapp/toolkit/promise';

import { useAuth } from '@eventapp/modules/auth';
import { useEvent } from '@eventapp/modules/event';

import { useFilter } from '@eventapp/common/hooks';

import EventCard from './components/EventCard';
import MyEventsFilter, { type FilterData } from './components/MyEventsFilter';

export default function MyEvents() {
  const { user } = useAuth();
  const { myEvents, getMyEvents } = useEvent();

  const [loading, setLoading] = useState(true);

  const { filter, filtered, reset } = useFilter(myEvents, []);

  useEffect(() => {
    if (!user?.id) { return; }

    getMyEvents(user.id)
      .finally(() => {
        wait(() => setLoading(false), 500);
      });
  }, [user]);

  const handleFilter = (data: FilterData) => {
    console.log(data);
  };

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
            <MyEventsFilter onFilter={handleFilter} />
            <Grid xl={4} md={6} sm={12}>
              {
                filtered
                  .sort((a, b) => a.name > b.name ? 1 : -1)
                  .map(event => (
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