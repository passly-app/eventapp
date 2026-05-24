import { useEffect, useState } from 'react';

import Stack from '@iziui/react/Stack';
import Switch from '@iziui/react/Switch';
import Typography from '@iziui/react/Typography';
import { Grid, GridItem } from '@iziui/react/Grid';

import { permissions, type Permissions } from '@eventapp/modules/roles';

interface PermissionssListProps { onChange?: (data: Permissions[]) => void; value: Permissions[] }
export default function PermissionssList({ value, onChange }: PermissionssListProps) {
  const [data, setData] = useState<Permissions[]>(value);

  useEffect(() => { if (onChange) { onChange(data); } }, [data]);

  useEffect(() => { setData(value); }, [value]);

  const handleSelectPermissions = (Permissions: Permissions) => {
    const shouldRemove = data.includes(Permissions);

    if (shouldRemove) {
      setData(prev => prev.filter(p => p !== Permissions));
    } else {
      setData(prev => [...prev, Permissions]);
    }
  };

  return (
    <Grid xl={6} lg={6} md={6} sm={12} gap={0}>
      {
        permissions.map((permission) => (
          <GridItem key={permission}>
            <Stack flexDirection="row" alignItems="center">
              <Switch
                checked={data.includes(permission)}
                onChange={() => handleSelectPermissions(permission)}
              />
              <Typography variant="body2" color="text.secondary">
                {permission}
              </Typography>
            </Stack>
          </GridItem>
        ))
      }
    </Grid>
  );
}