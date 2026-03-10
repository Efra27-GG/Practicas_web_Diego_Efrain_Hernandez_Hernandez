import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto.model';

@Component({
  selector: 'app-dama',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dama.html',
  styleUrls: ['./dama.css']
})
export class Dama implements OnInit {
  productos: Producto[] = [];
  tallasDisponibles: string[] = ['Chica', 'Mediana', 'Grande', 'Extra Grande'];
  filtroTallas: string[] = [];
  precioMaximo: number = 1000;

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.productos = this.productoService.getProductosPorCategoria('dama');
    // Calcular precio máximo para el filtro
    this.precioMaximo = Math.max(...this.productos.map(p => p.precio), 1000);
  }

  getPrecioConDescuento(producto: Producto): number {
    return producto.precio;
  }

  getDescuento(producto: Producto): number {
    if (producto.precioOriginal) {
      return Math.round(((producto.precioOriginal - producto.precio) / producto.precioOriginal) * 100);
    }
    return 0;
  }
}