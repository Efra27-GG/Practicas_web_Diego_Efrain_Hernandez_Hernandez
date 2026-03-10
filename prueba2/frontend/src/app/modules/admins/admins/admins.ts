import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-admins',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admins.html',
  styleUrls: ['./admins.css']
})
export class Admins implements OnInit {
  admins: Usuario[] = [];
  superAdmin: Usuario | null = null;
  
  // Modal de nuevo admin
  showModal: boolean = false;
  nuevoAdmin = {
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  
  // Modal de edición
  showEditModal: boolean = false;
  adminEditando: Usuario | null = null;
  editPassword: string = '';
  
  // Modal de cambio de contraseña
  showPasswordModal: boolean = false;
  adminPassword: Usuario | null = null;
  nuevaPassword: string = '';
  confirmNuevaPassword: string = '';
  
  mensaje: string = '';
  mensajeError: string = '';

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.cargarAdmins();
    this.superAdmin = this.authService.getCurrentUser();
  }

  cargarAdmins() {
    this.admins = this.authService.getAdmins().filter(a => a.id !== this.superAdmin?.id);
  }

  // Abrir modal de nuevo admin
  abrirModalNuevo() {
    this.showModal = true;
    this.nuevoAdmin = { nombre: '', email: '', password: '', confirmPassword: '' };
    this.mensaje = '';
    this.mensajeError = '';
  }

  // Crear nuevo admin
  crearAdmin() {
    // Validaciones
    if (!this.nuevoAdmin.nombre || !this.nuevoAdmin.email || !this.nuevoAdmin.password) {
      this.mensajeError = 'Todos los campos son obligatorios';
      return;
    }

    if (this.nuevoAdmin.password !== this.nuevoAdmin.confirmPassword) {
      this.mensajeError = 'Las contraseñas no coinciden';
      return;
    }

    if (this.nuevoAdmin.password.length < 6) {
      this.mensajeError = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    const creado = this.authService.crearAdmin(
      this.nuevoAdmin.nombre,
      this.nuevoAdmin.email,
      this.nuevoAdmin.password
    );

    if (creado) {
      this.mensaje = 'Administrador creado exitosamente';
      this.cargarAdmins();
      setTimeout(() => {
        this.showModal = false;
      }, 1500);
    } else {
      this.mensajeError = 'El email ya está registrado';
    }
  }

  // Abrir modal de edición
  editarAdmin(admin: Usuario) {
    this.adminEditando = { ...admin };
    this.showEditModal = true;
    this.mensaje = '';
    this.mensajeError = '';
  }

  // Guardar cambios
  guardarEdicion() {
    if (!this.adminEditando) return;

    const actualizado = this.authService.actualizarAdmin(this.adminEditando.id, {
      nombre: this.adminEditando.nombre,
      email: this.adminEditando.email,
      activo: this.adminEditando.activo
    });

    if (actualizado) {
      this.mensaje = 'Administrador actualizado';
      this.cargarAdmins();
      setTimeout(() => {
        this.showEditModal = false;
      }, 1500);
    } else {
      this.mensajeError = 'Error al actualizar';
    }
  }

  // Abrir modal de cambio de contraseña
  abrirCambioPassword(admin: Usuario) {
    this.adminPassword = admin;
    this.nuevaPassword = '';
    this.confirmNuevaPassword = '';
    this.showPasswordModal = true;
    this.mensaje = '';
    this.mensajeError = '';
  }

  // Cambiar contraseña
  cambiarPassword() {
    if (!this.adminPassword) return;

    if (!this.nuevaPassword || !this.confirmNuevaPassword) {
      this.mensajeError = 'Todos los campos son obligatorios';
      return;
    }

    if (this.nuevaPassword !== this.confirmNuevaPassword) {
      this.mensajeError = 'Las contraseñas no coinciden';
      return;
    }

    if (this.nuevaPassword.length < 6) {
      this.mensajeError = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    const cambiado = this.authService.cambiarPasswordAdmin(this.adminPassword.id, this.nuevaPassword);

    if (cambiado) {
      this.mensaje = 'Contraseña actualizada';
      setTimeout(() => {
        this.showPasswordModal = false;
      }, 1500);
    } else {
      this.mensajeError = 'Error al cambiar contraseña';
    }
  }

  // Eliminar admin
  eliminarAdmin(id: number, nombre: string) {
    if (confirm(`¿Estás seguro de eliminar al administrador "${nombre}"?`)) {
      const eliminado = this.authService.eliminarAdmin(id);
      
      if (eliminado) {
        alert('Administrador eliminado');
        this.cargarAdmins();
      } else {
        alert('No se puede eliminar este administrador');
      }
    }
  }

  // Cerrar modales
  cerrarModales() {
    this.showModal = false;
    this.showEditModal = false;
    this.showPasswordModal = false;
    this.adminEditando = null;
    this.adminPassword = null;
  }
}