export enum ROLES {
    ADMIM,
    MANAGER,
    REGULAR
};

export interface User {
    username: string,
    password: string,
    role: ROLES
};

export const USERS: User[] = [
    { username: 'admin', password: 'admin', role: ROLES.ADMIM },
    { username: 'manager', password: 'manager', role: ROLES.MANAGER },
    { username: 'regular', password: 'regular', role: ROLES.REGULAR },
];