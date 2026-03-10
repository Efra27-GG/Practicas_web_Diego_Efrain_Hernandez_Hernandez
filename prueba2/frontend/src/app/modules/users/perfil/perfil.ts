import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class Perfil implements OnInit {
  usuario: Usuario | null = null;
  
  // Pestañas
  activeTab: string = 'perfil';
  
  // Datos personales
  editando: boolean = false;
  nombreEdit: string = '';
  emailEdit: string = '';
  telefonoEdit: string = '';
  
  // Cambio de contraseña
  passwordActual: string = '';
  passwordNueva: string = '';
  passwordConfirm: string = '';
  
  // Reseñas del usuario
  resenas: any[] = [];
  
  // Mensajes
  mensaje: string = '';
  mensajeError: string = '';
  mensajePassword: string = '';
  mensajePasswordError: string = '';

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.cargarUsuario();
    this.cargarResenas();
  }

  cargarUsuario() {
    this.usuario = this.authService.getCurrentUser();
    if (this.usuario) {
      this.nombreEdit = this.usuario.nombre;
      this.emailEdit = this.usuario.email;
      this.telefonoEdit = this.usuario.telefono || '';
    }
  }

  cargarResenas() {
    if (this.usuario) {
      this.resenas = this.authService.getResenasUsuario(this.usuario.id);
    }
  }

  activarEdicion() {
    this.editando = true;
    this.mensaje = '';
    this.mensajeError = '';
  }

  cancelarEdicion() {
    this.editando = false;
    if (this.usuario) {
      this.nombreEdit = this.usuario.nombre;
      this.emailEdit = this.usuario.email;
      this.telefonoEdit = this.usuario.telefono || '';
    }
  }

  guardarPerfil() {
    if (!this.usuario) return;

    if (!this.nombreEdit || !this.emailEdit) {
      this.mensajeError = 'Nombre y email son obligatorios';
      return;
    }

    const actualizado = this.authService.actualizarPerfil(this.usuario.id, {
      nombre: this.nombreEdit,
      email: this.emailEdit,
      telefono: this.telefonoEdit
    });

    if (actualizado) {
      this.mensaje = 'Perfil actualizado correctamente';
      this.editando = false;
      this.cargarUsuario();
    } else {
      this.mensajeError = 'Error al actualizar el perfil';
    }
  }

  cambiarPassword() {
    if (!this.usuario) return;

    // Validaciones
    if (!this.passwordActual || !this.passwordNueva || !this.passwordConfirm) {
      this.mensajePasswordError = 'Todos los campos son obligatorios';
      return;
    }

    if (this.passwordNueva !== this.passwordConfirm) {
      this.mensajePasswordError = 'Las contraseñas nuevas no coinciden';
      return;
    }

    if (this.passwordNueva.length < 6) {
      this.mensajePasswordError = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    const cambiada = this.authService.cambiarMiPassword(
      this.usuario.id,
      this.passwordActual,
      this.passwordNueva
    );

    if (cambiada) {
      this.mensajePassword = 'Contraseña cambiada correctamente';
      this.passwordActual = '';
      this.passwordNueva = '';
      this.passwordConfirm = '';
    } else {
      this.mensajePasswordError = 'La contraseña actual es incorrecta';
    }
  }

  getRolBadge(rol: string): string {
    switch(rol) {
      case 'superadmin': return 'bg-danger';
      case 'admin': return 'bg-warning';
      default: return 'bg-primary';
    }
  }

  cambiarTab(tab: string) {
    this.activeTab = tab;
    this.limpiarMensajes();
  }

  limpiarMensajes() {
    this.mensaje = '';
    this.mensajeError = '';
    this.mensajePassword = '';
    this.mensajePasswordError = '';
  }
}