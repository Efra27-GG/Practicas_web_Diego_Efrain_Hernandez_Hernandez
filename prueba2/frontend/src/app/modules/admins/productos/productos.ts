import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ← IMPORTAR ESTO
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule], // ← AGREGAR FormsModule
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class Productos implements OnInit {
  productos: Producto[] = [];
  filtro: string = 'todos';
  searchTerm: string = '';

  constructor(
    public productoService: ProductoService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productos = this.productoService.getProductos();
  }

  eliminarProducto(id: number) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      const index = this.productoService['productos'].findIndex(p => p.id === id);
      if (index !== -1) {
        this.productoService['productos'].splice(index, 1);
        this.cargarProductos();
      }
    }
  }

  filtrarProductos(): Producto[] {
    let filtrados = this.productos;
    
    if (this.filtro !== 'todos') {
      filtrados = filtrados.filter(p => p.categoria === this.filtro);
    }
    
    if (this.searchTerm) {
      filtrados = filtrados.filter(p => 
        p.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    
    return filtrados;
  }

  getDescuento(producto: Producto): number {
    if (producto.precioOriginal) {
      return Math.round(((producto.precioOriginal - producto.precio) / producto.precioOriginal) * 100);
    }
    return 0;
  }
}