import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productos: Producto[] = [
    // Dama
    {
      id: 1,
      nombre: 'Vestido Floral',
      descripcion: 'Vestido estampado floral, tela suave y fresca ideal para primavera',
      precio: 499.99,
      categoria: 'dama',
      tallas: ['Chica', 'Mediana', 'Grande'],
      imagenes: ['👗'],
      calificacion: 4.5,
      vendidos: 150
    },
    {
      id: 2,
      nombre: 'Blusa Satinada',
      descripcion: 'Blusa de satín color negro, elegante para ocasiones especiales',
      precio: 399.99,
      categoria: 'dama',
      tallas: ['Chica', 'Mediana'],
      imagenes: ['👚'],
      calificacion: 4.2,
      vendidos: 89
    },
    {
      id: 3,
      nombre: 'Pants Deportivo',
      descripcion: 'Pants cómodo para el día a día, color gris',
      precio: 299.99,
      categoria: 'dama',
      tallas: ['Chica', 'Mediana', 'Grande'],
      imagenes: ['👖'],
      calificacion: 4.0,
      vendidos: 200
    },
    
    // Caballero
    {
      id: 4,
      nombre: 'Camisa Manga Larga',
      descripcion: 'Camisa formal manga larga, color azul cielo',
      precio: 449.99,
      categoria: 'caballero',
      tallas: ['Mediana', 'Grande', 'Extra Grande'],
      imagenes: ['👔'],
      calificacion: 4.3,
      vendidos: 120
    },
    {
      id: 5,
      nombre: 'Playera Básica',
      descripcion: 'Playera de algodón, paquete 3 colores: negro, blanco, gris',
      precio: 299.99,
      categoria: 'caballero',
      tallas: ['Chica', 'Mediana', 'Grande', 'Extra Grande'],
      imagenes: ['👕'],
      calificacion: 4.7,
      vendidos: 350
    },
    
    // Ofertas
    {
      id: 6,
      nombre: 'Chamarra de Mezclilla',
      descripcion: 'Chamarra clásica de mezclilla, edición limitada',
      precio: 599.99,
      precioOriginal: 899.99,
      descuento: 33,
      categoria: 'ofertas',
      tallas: ['Mediana', 'Grande'],
      imagenes: ['🧥'],
      calificacion: 4.8,
      vendidos: 45
    },
    {
      id: 7,
      nombre: 'Vestido Noche',
      descripcion: 'Vestido largo color rojo, ideal para eventos formales',
      precio: 799.99,
      precioOriginal: 1299.99,
      descuento: 38,
      categoria: 'ofertas',
      tallas: ['Chica', 'Mediana'],
      imagenes: ['👗'],
      calificacion: 4.9,
      vendidos: 28
    }
  ];

  constructor() { }

  getProductos(): Producto[] {
    return this.productos;
  }

  getProductosPorCategoria(categoria: string): Producto[] {
    return this.productos.filter(p => p.categoria === categoria);
  }

  getProductoById(id: number): Producto | undefined {
    return this.productos.find(p => p.id === id);
  }

  getMasVendidos(limite: number = 4): Producto[] {
    return [...this.productos]
      .sort((a, b) => (b.vendidos || 0) - (a.vendidos || 0))
      .slice(0, limite);
  }
}