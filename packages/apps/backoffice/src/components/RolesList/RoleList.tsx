import { useEffect, useState } from 'react';

import Stack from '@iziui/react/Stack';
import Switch from '@iziui/react/Switch';
import Typography from '@iziui/react/Typography';
import { Grid, GridItem } from '@iziui/react/Grid';

import { useRoles } from '@eventapp/modules/roles';

interface RoleListProps { onChange?: (data: string[]) => void; value: string[] }
export default function RoleList({ value, onChange }: RoleListProps) {
  const [data, setData] = useState<string[]>(value);

  const { roles, loading, getRoles } = useRoles();

  useEffect(() => { getRoles(); }, []);

  useEffect(() => { if (onChange) { onChange(data); } }, [data]);

  const handleSelectPermission = (role: string) => {
    const shouldRemove = data.includes(role);

    setData(prev => shouldRemove
      ? prev.filter(p => p !== role)
      : [...prev, role]
    );
  };

  return (
    <>
      {
        loading && (
          <div>carregando...</div>
        )
      }
      {
        !loading && (
          <Grid xl={4} lg={6} md={6} sm={12} gap={0}>
            {
              roles.map((role) => (
                <GridItem key={role.id}>
                  <Stack flexDirection="row" alignItems="center">
                    <Switch
                      checked={data.includes(role.id)}
                      onChange={() => handleSelectPermission(role.id)}
                    />
                    <Typography variant="body2" color="text.secondary">{role.name}</Typography>
                  </Stack>
                </GridItem>
              ))
            }
          </Grid>
        )
      }
    </>
  );
};