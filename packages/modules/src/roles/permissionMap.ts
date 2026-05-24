import type { Permissions } from './interface';

type PermissionMapped = Partial<{
  [x in Permissions]: string;
}>;

export const MAP_PERMISSION: PermissionMapped = {
  'user:self:*': 'Gerencie seu perfil com segurança e autonomia',
};
