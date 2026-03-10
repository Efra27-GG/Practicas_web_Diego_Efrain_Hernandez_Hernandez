export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  precioOriginal?: number;
  descuento?: number;
  categoria: 'dama' | 'caballero' | 'ofertas';
  tallas: string[];
  imagenes: string[];
  calificacion?: number;
  vendidos?: number;
  esNuevo?: boolean;
}