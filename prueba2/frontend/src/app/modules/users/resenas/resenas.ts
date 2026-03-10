import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

interface Resena {
  id: number;
  usuarioId: number;
  usuarioNombre: string;
  productoId: number;
  calificacion: number;
  comentario: string;
  fecha: Date;
}

@Component({
  selector: 'app-resenas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resenas.html',
  styleUrls: ['./resenas.css']
})
export class Resenas {
  @Input() productoId: number = 0;
  
  resenas: Resena[] = [
    {
      id: 1,
      usuarioId: 1,
      usuarioNombre: 'María González',
      productoId: 1,
      calificacion: 5,
      comentario: 'Excelente calidad, muy bonita la tela',
      fecha: new Date(Date.now() - 86400000)
    },
    {
      id: 2,
      usuarioId: 2,
      usuarioNombre: 'Juan Pérez',
      productoId: 1,
      calificacion: 4,
      comentario: 'Buena relación precio-calidad',
      fecha: new Date(Date.now() - 172800000)
    }
  ];

  nuevaResena = {
    calificacion: 5,
    comentario: ''
  };

  constructor(public authService: AuthService) {}

  enviarResena() {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    // Verificar si ya reseñó
    const yaResenio = this.resenas.some(r => r.usuarioId === user.id);
    if (yaResenio) {
      alert('Ya has reseñado este producto');
      return;
    }

    const nueva: Resena = {
      id: this.resenas.length + 1,
      usuarioId: user.id,
      usuarioNombre: user.nombre,
      productoId: this.productoId,
      calificacion: this.nuevaResena.calificacion,
      comentario: this.nuevaResena.comentario,
      fecha: new Date()
    };

    this.resenas.unshift(nueva);
    this.nuevaResena = { calificacion: 5, comentario: '' };
  }

  getPromedio(): number {
    if (this.resenas.length === 0) return 0;
    const suma = this.resenas.reduce((acc, r) => acc + r.calificacion, 0);
    return suma / this.resenas.length;
  }

  puedeReseniar(): boolean {
    const user = this.authService.getCurrentUser();
    if (!user) return false;
    return !this.resenas.some(r => r.usuarioId === user.id);
  }
}