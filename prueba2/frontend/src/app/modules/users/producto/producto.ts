import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto.model';
import { Resenas } from '../resenas/resenas'; // ← IMPORTAR EL COMPONENTE DE RESEÑAS

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    Resenas  // ← AGREGARLO AQUÍ EN IMPORTS
  ],
  templateUrl: './producto.html',
  styleUrls: ['./producto.css']
})
export class ProductoComponent implements OnInit {
  producto?: Producto;
  productosRelacionados: Producto[] = [];

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.producto = this.productoService.getProductoById(id);
      
      if (this.producto) {
        this.productosRelacionados = this.productoService
          .getProductosPorCategoria(this.producto.categoria)
          .filter(p => p.id !== this.producto?.id)
          .slice(0, 3);
      }
    });
  }

  getDescuento(): number {
    if (this.producto?.precioOriginal) {
      return Math.round(((this.producto.precioOriginal - this.producto.precio) / this.producto.precioOriginal) * 100);
    }
    return 0;
  }
}