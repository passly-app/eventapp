import Permissions from './Permissions';

export type Permissions = typeof Permissions[number];

export interface RoleConfig {
    id: string;
    name: string;
    description: string;
    permissions: Permissions[];
}