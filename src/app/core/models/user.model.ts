export interface User {
  id: string;
  name: string;
  email: string;
  roleName: 'EMPLOYEE' | 'MANAGER' | 'ADMIN';
}