import type { InputEvent } from 'react';

import Chip from '@iziui/react/Chip';
import Icon from '@iziui/react/Icon';
import Input from '@iziui/react/Input';
import Stack from '@iziui/react/Stack';
import Button from '@iziui/react/Button';
import Typography from '@iziui/react/Typography';
import { useForm } from '@iziui/react/lab/Form';
import { Grid, GridItem } from '@iziui/react/Grid';
import { Drawer, DrawerHeader, DrawerContent, DrawerFooter, useDrawer } from '@iziui/react/Drawer';

import type { Event } from '@eventapp/modules/event';

import { debounce } from '@eventapp/common/utils';

const STATUS_LIST: FilterData['status'][] = ['all', 'published', 'draft', 'disabled'];
const STATUS_MAP: { [x in FilterData['status']]: string } = {
  all: 'Todos',
  disabled: 'Desabilitado',
  draft: 'Rascunho',
  published: 'Publicado'
};

export type FilterData = {
  name: string;
  status: Event['status'] | 'all';
}

interface MyEventsFilterProps {
  onFilter: (data: FilterData) => void;
}

export default function MyEventsFilter({ onFilter }: MyEventsFilterProps) {
  const [openDrawer, toggleDrawer] = useDrawer();

  const formGroup = useForm<FilterData>({
    form: {
      name: { defaultValue: '' },
      status: { defaultValue: 'all' }
    },
    handle: {
      submit: ({ values }) => { onFilter(values); }
    }
  }, []);

  const handleInput = (e: InputEvent<HTMLInputElement>) => {
    formGroup.setValues({ name: e.target['value'] });

    debounce.delay(() => { handleFilter(); }, 500);
  };

  const handleFilter = () => { formGroup.submit(); };
  const handleChangeStatus = (status: FilterData['status']) => {
    formGroup.setValues({ status });
  };

  return (
    <>
      <Grid>
        <GridItem xl={10} sm={7}>
          <Input
            placeholder="Buscar por nome..."
            value={formGroup.values.name}
            startIcon={<Icon size={20} name="search" color="grey" />}
            onInput={handleInput}
          />
        </GridItem>
        <GridItem xl={2} sm={5}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Icon name="filter" />}
            onClick={toggleDrawer}
          >
            Filtros
          </Button>
        </GridItem>
      </Grid>
      <Drawer
        direction="bottom"
        open={openDrawer}
        onClose={toggleDrawer}
        header={
          <DrawerHeader onClose={toggleDrawer}>
            <Typography>Filtro</Typography>
          </DrawerHeader>
        }
        body={
          <DrawerContent>
            <Stack>
              <Stack>
                <Typography variant="body2">Status:</Typography>
                <Stack flexDirection="row">
                  {
                    STATUS_LIST.map(status => (
                      <Chip
                        key={status}
                        label={STATUS_MAP[status]}
                        color={formGroup.values.status === status ? 'primary' : 'default'}
                        onClick={() => handleChangeStatus(status)}
                      />
                    ))
                  }
                </Stack>
              </Stack>
            </Stack>
          </DrawerContent>
        }
        footer={
          <DrawerFooter>
            <Stack flexDirection="row" justifyContent="flex-end">
              <Button variant="outlined">Cancelar</Button>
              <Button onClick={handleFilter}>Buscar</Button>
            </Stack>
          </DrawerFooter>
        }
      />
    </>
  );
}