import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionService } from '../../../services/notificacion.service';
import { Notificacion } from '../../../models/notificacion.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificaciones.html',
  styleUrls: ['./notificaciones.css']
})
export class Notificaciones implements OnInit {
  notificaciones: Notificacion[] = [];
  filtro: string = 'todas';

  constructor(
    public notificacionService: NotificacionService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.cargarNotificaciones();
  }

  cargarNotificaciones() {
    this.notificaciones = this.notificacionService.getNotificaciones();
  }

  marcarComoLeida(id: number) {
    this.notificacionService.marcarComoLeida(id);
    this.cargarNotificaciones();
  }

  marcarTodasComoLeidas() {
    this.notificacionService.marcarTodasComoLeidas();
    this.cargarNotificaciones();
  }

  eliminarNotificacion(id: number) {
    if (confirm('¿Eliminar esta notificación?')) {
      this.notificacionService.eliminarNotificacion(id);
      this.cargarNotificaciones();
    }
  }

  getNotificacionesFiltradas(): Notificacion[] {
    if (this.filtro === 'noLeidas') {
      return this.notificaciones.filter(n => !n.leida);
    }
    return this.notificaciones;
  }

  getIcono(tipo: string): string {
    switch(tipo) {
      case 'promocion': return '🎉';
      case 'descuento': return '🏷️';
      default: return '📢';
    }
  }
}