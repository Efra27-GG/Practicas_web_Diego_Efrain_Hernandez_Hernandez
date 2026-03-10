export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password?: string;
  telefono?: string;
  role: 'registrado' | 'admin' | 'superadmin';
  fechaRegistro: Date;
  activo?: boolean;
}