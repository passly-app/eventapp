import {
  createContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

import { useToast } from '@iziui/react/Toast';

import type { RoleConfig } from './interface';
import RolesServices from './rolesServices';

export interface RolesContextConfig {
  loading: boolean;

  roles: RoleConfig[];

  getRoles: () => Promise<void>;

  deleteRole: (id: string) => Promise<void>;

  createRole: (data: Omit<RoleConfig, 'id'>) => Promise<void>;

  updateRole: (data: RoleConfig) => Promise<void>;
}

export const RolesContext = createContext<RolesContextConfig>({
  loading: false,

  roles: [],

  getRoles: () => Promise.resolve(),

  deleteRole: () => Promise.resolve(),

  createRole: () => Promise.resolve(),

  updateRole: () => Promise.resolve(),
});

export default function RolesProvider({ children, rolesServices }: PropsWithChildren<{
  rolesServices: RolesServices;
}>) {
  const { addToast } = useToast();

  const [roles, setRoles] = useState<RoleConfig[]>([]);
  const [loading, setLoading] = useState(true);

  const context = useMemo<RolesContextConfig>(() => ({
    loading,

    roles,

    getRoles: () => getRoles(),

    deleteRole: (id) => deleteRole(id),

    createRole: (data) => createRole(data),

    updateRole: (data) => updateRole(data),
  }), [roles]);

  const createRole = async (data: Omit<RoleConfig, 'id'>) => {
    return rolesServices.create(data)
      .then(res => setRoles((prev) => ([...prev, res])))
      .then(() => addToast({ color: 'success', message: `A role "${data.name}" foi adicionada`, delay: 5000 }))
      .catch(() => addToast({ color: 'error', message: 'Não foi possível criar a role', delay: 5000 }));
  };

  const getRoles = async () => {
    return rolesServices.list()
      .then(r => setRoles(r))
      .finally(() => setLoading(false));
  };

  const deleteRole = async (id: string) => {
    return rolesServices.delete(id)
      .then(() => setRoles(prev => prev.filter(r => r.id !== id)))
      .then(() => addToast({
        color: 'success',
        message: 'Role deletada com sucesso',
        delay: 5000
      }))
      .catch(() => addToast({
        color: 'error',
        message: 'Não foi possível deletar a role',
        delay: 5000
      }));
  };

  const updateRole = async (data: RoleConfig) => {
    return rolesServices.update(data)
      .then(() => setRoles(prev => prev.map(r => r.id === data.id ? data : r)))
      .then(() => addToast({
        color: 'success',
        message: `A role "${data.name}" foi editada`,
        delay: 5000
      }))
      .catch(() => addToast({
        color: 'error',
        message: 'Não foi possível editar a role',
        delay: 5000
      }));
  };

  return (
    <RolesContext.Provider value={context}>
      {children}
    </RolesContext.Provider>
  );
}