import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  masVendidos: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.masVendidos = this.productoService.getMasVendidos(4);
  }

  getPrecioConDescuento(producto: Producto): number {
    if (producto.descuento) {
      return producto.precio;
    }
    return producto.precio;
  }

  getDescuento(producto: Producto): number {
    if (producto.precioOriginal) {
      return Math.round(((producto.precioOriginal - producto.precio) / producto.precioOriginal) * 100);
    }
    return producto.descuento || 0;
  }
}