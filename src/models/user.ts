type typeRole = 'admin' | 'user' | 'guest';

export interface User {
    id: string;
    name: string;
    email: string;
    role: typeRole;
}