import { slug } from '@eventapp/toolkit/string';

import type DB from '../../../integrations/src/db';
import type { RoleConfig } from './interface';

export default class RolesServices {
  private static PATH = 'roles';

  constructor(private db: DB) { }

  async details(id: string) {
    return this.db.getItem<RoleConfig>({
      path: RolesServices.PATH,
      pathSegments: [],
      filters: [{ field: 'id', operator: '==', value: id }]
    });
  }

  async list() {
    return this.db.getList<RoleConfig>({
      path: RolesServices.PATH,
      pathSegments: [],
      filters: [],
    });
  }

  async create(role: Omit<RoleConfig, 'id'>) {
    const id = slug(role.name);

    const newRole = { ...role, id };

    return this.db.setItem<RoleConfig>({
      data: newRole,
      path: RolesServices.PATH,
      pathSegments: [id],
    }).then(() => newRole);
  }

  async delete(id: string) {
    return this.db.deleteItem({
      path: RolesServices.PATH,
      pathSegments: [id],
    });
  }

  async update(role: RoleConfig) {
    return this.db.setItem<RoleConfig>({
      data: role,
      path: RolesServices.PATH,
      pathSegments: [role.id],
    }).then(() => role);
  }
}