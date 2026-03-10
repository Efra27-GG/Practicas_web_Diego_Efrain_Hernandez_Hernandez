import { Injectable } from '@angular/core';
import { Notificacion } from '../models/notificacion.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private notificaciones: Notificacion[] = [
    {
      id: 1,
      titulo: '¡Bienvenido a ShadowAngels!',
      mensaje: 'Gracias por registrarte. Disfruta de nuestras ofertas especiales.',
      fecha: new Date(),
      leida: false,
      tipo: 'general'
    },
    {
      id: 2,
      titulo: 'Descuento del fin de semana',
      mensaje: '20% de descuento en ropa de dama. Válido solo este fin de semana.',
      fecha: new Date(Date.now() - 86400000),
      leida: false,
      tipo: 'descuento'
    },
    {
      id: 3,
      titulo: 'Nuevos productos en caballero',
      mensaje: 'Llegaron nuevas camisas y pants. ¡Visita la sección de caballero!',
      fecha: new Date(Date.now() - 172800000),
      leida: true,
      tipo: 'promocion'
    }
  ];

  constructor(private authService: AuthService) {}

  getNotificaciones(): Notificacion[] {
    const user = this.authService.getCurrentUser();
    if (!user) return [];
    
    return this.notificaciones
      .filter(n => !n.userId || n.userId === user.id)
      .sort((a, b) => b.fecha.getTime() - a.fecha.getTime());
  }

  getNoLeidas(): number {
    return this.getNotificaciones().filter(n => !n.leida).length;
  }

  marcarComoLeida(id: number) {
    const notif = this.notificaciones.find(n => n.id === id);
    if (notif) {
      notif.leida = true;
    }
  }

  marcarTodasComoLeidas() {
    const user = this.authService.getCurrentUser();
    if (!user) return;
    
    this.notificaciones
      .filter(n => !n.userId || n.userId === user.id)
      .forEach(n => n.leida = true);
  }

  eliminarNotificacion(id: number) {
    const index = this.notificaciones.findIndex(n => n.id === id);
    if (index !== -1) {
      this.notificaciones.splice(index, 1);
    }
  }

  // Solo para admins - VERSIÓN CORREGIDA
  crearNotificacion(notificacion: Omit<Notificacion, 'id' | 'fecha' | 'leida'>) {
    const newNotif: Notificacion = {
      id: this.notificaciones.length + 1,
      fecha: new Date(),
      leida: false,
      ...notificacion
    };
    this.notificaciones.push(newNotif);
  }
}