import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto.model';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-form.html',
  styleUrls: ['./producto-form.css']
})
export class ProductoForm implements OnInit {
  producto: Producto = {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    categoria: 'dama',
    tallas: [],
    imagenes: ['📦'],
    calificacion: 0,
    vendidos: 0
  };
  isEditing = false;
  tallasDisponibles = ['Chica', 'Mediana', 'Grande', 'Extra Grande'];
  categorias = ['dama', 'caballero', 'ofertas'];
  precioOriginal: number | undefined;
  descuento: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditing = true;
      const existingProduct = this.productoService.getProductoById(Number(id));
      if (existingProduct) {
        this.producto = { ...existingProduct };
        if (existingProduct.precioOriginal) {
          this.precioOriginal = existingProduct.precioOriginal;
          this.descuento = Math.round(((existingProduct.precioOriginal - existingProduct.precio) / existingProduct.precioOriginal) * 100);
        }
      }
    }
  }

  toggleTalla(talla: string) {
    const index = this.producto.tallas.indexOf(talla);
    if (index === -1) {
      this.producto.tallas.push(talla);
    } else {
      this.producto.tallas.splice(index, 1);
    }
  }

  onPrecioOriginalChange() {
    if (this.precioOriginal && this.precioOriginal > this.producto.precio) {
      this.descuento = Math.round(((this.precioOriginal - this.producto.precio) / this.precioOriginal) * 100);
      this.producto.precioOriginal = this.precioOriginal;
      this.producto.descuento = this.descuento;
    } else {
      this.precioOriginal = undefined;
      this.descuento = undefined;
      this.producto.precioOriginal = undefined;
      this.producto.descuento = undefined;
    }
  }

  onSubmit() {
    if (this.isEditing) {
      // Actualizar producto existente
      const index = this.productoService['productos'].findIndex(p => p.id === this.producto.id);
      if (index !== -1) {
        this.productoService['productos'][index] = { ...this.producto };
      }
    } else {
      // Crear nuevo producto
      this.producto.id = this.productoService['productos'].length + 1;
      this.productoService['productos'].push({ ...this.producto });
    }
    
    this.router.navigate(['/admin/productos']);
  }

  cancelar() {
    this.router.navigate(['/admin/productos']);
  }
}