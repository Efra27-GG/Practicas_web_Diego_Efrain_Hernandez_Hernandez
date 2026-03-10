export interface Notificacion {
  id: number;
  titulo: string;
  mensaje: string;
  fecha: Date;
  leida: boolean;
  userId?: number; // null = para todos los usuarios
  tipo: 'promocion' | 'descuento' | 'general';
}