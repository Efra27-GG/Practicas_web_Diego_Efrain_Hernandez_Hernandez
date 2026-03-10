import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isBrowser: boolean;

    private usuarios: Usuario[] = [
    {
        id: 1,
        nombre: 'Usuario Normal',
        email: 'usuario@email.com',
        password: '123456',
        role: 'registrado',
        fechaRegistro: new Date()
    },
    {
        id: 2,
        nombre: 'Admin General',
        email: 'admin@shadowangels.com',
        password: 'admin123',
        role: 'admin',
        fechaRegistro: new Date()
    },
    {
        id: 3,
        nombre: 'Super Admin',
        email: 'super@shadowangels.com',
        password: 'super123',
        role: 'superadmin',  // ← DEBE SER 'superadmin'
        fechaRegistro: new Date()
    }
    ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    // Solo intentar acceder a localStorage si estamos en el navegador
    if (this.isBrowser) {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        this.currentUserSubject.next(JSON.parse(savedUser));
      }
    }
  }

  login(email: string, password: string): boolean {
    const user = this.usuarios.find(u => u.email === email && u.password === password);
    
    if (user) {
      const { password, ...userWithoutPassword } = user;
      this.currentUserSubject.next(userWithoutPassword as Usuario);
      
      // Solo guardar en localStorage si estamos en el navegador
      if (this.isBrowser) {
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      }
      return true;
    }
    return false;
  }

  logout() {
    this.currentUserSubject.next(null);
    
    // Solo eliminar de localStorage si estamos en el navegador
    if (this.isBrowser) {
      localStorage.removeItem('currentUser');
    }
  }

  register(nombre: string, email: string, password: string): boolean {
    if (this.usuarios.some(u => u.email === email)) {
      return false;
    }

    const newUser: Usuario = {
      id: this.usuarios.length + 1,
      nombre,
      email,
      password,
      role: 'registrado',
      fechaRegistro: new Date()
    };

    this.usuarios.push(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    this.currentUserSubject.next(userWithoutPassword as Usuario);
    
    // Solo guardar en localStorage si estamos en el navegador
    if (this.isBrowser) {
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    }
    
    return true;
  }

  getCurrentUser(): Usuario | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  hasRole(role: string | string[]): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    return user.role === role;
  }

  


// Obtener todos los administradores (solo superadmin)
getAdmins(): Usuario[] {
  return this.usuarios.filter(u => u.role === 'admin' || u.role === 'superadmin');
}

// Crear nuevo admin (solo superadmin)
crearAdmin(nombre: string, email: string, password: string): boolean {
  // Verificar si ya existe
  if (this.usuarios.some(u => u.email === email)) {
    return false;
  }

  const newAdmin: Usuario = {
    id: this.usuarios.length + 1,
    nombre,
    email,
    password,
    role: 'admin',  // Siempre 'admin', no superadmin
    fechaRegistro: new Date(),
    activo: true
  };

  this.usuarios.push(newAdmin);
  return true;
}

// Actualizar admin (solo superadmin)
actualizarAdmin(id: number, datos: Partial<Usuario>): boolean {
  const admin = this.usuarios.find(u => u.id === id);
  if (!admin || admin.role === 'superadmin') {
    return false; // No se puede modificar superadmin
  }

  // Actualizar solo campos permitidos
  if (datos.nombre) admin.nombre = datos.nombre;
  if (datos.email) admin.email = datos.email;
  if (datos.telefono) admin.telefono = datos.telefono;
  if (datos.activo !== undefined) admin.activo = datos.activo;
  
  return true;
}

// Eliminar admin (solo superadmin)
eliminarAdmin(id: number): boolean {
  const index = this.usuarios.findIndex(u => u.id === id);
  
  if (index === -1) return false;
  
  // No permitir eliminar superadmin
  if (this.usuarios[index].role === 'superadmin') {
    return false;
  }
  
  this.usuarios.splice(index, 1);
  return true;
}

// Cambiar contraseña de admin (solo superadmin)
cambiarPasswordAdmin(id: number, nuevaPassword: string): boolean {
  const admin = this.usuarios.find(u => u.id === id);
  if (!admin || admin.role === 'superadmin') {
    return false;
  }
  
  admin.password = nuevaPassword;
  return true;
}




  // Actualizar perfil de usuario
actualizarPerfil(id: number, datos: Partial<Usuario>): boolean {
  const usuario = this.usuarios.find(u => u.id === id);
  if (!usuario) return false;

  // Actualizar solo campos permitidos
  if (datos.nombre) usuario.nombre = datos.nombre;
  if (datos.email) usuario.email = datos.email;
  if (datos.telefono !== undefined) usuario.telefono = datos.telefono;

  // Actualizar también en localStorage si es el usuario actual
  const currentUser = this.getCurrentUser();
  if (currentUser && currentUser.id === id) {
    const { password, ...userWithoutPassword } = usuario;
    this.currentUserSubject.next(userWithoutPassword as Usuario);
    if (this.isBrowser) {
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    }
  }

  return true;
}

// Cambiar contraseña del propio usuario
cambiarMiPassword(id: number, passwordActual: string, nuevaPassword: string): boolean {
  const usuario = this.usuarios.find(u => u.id === id);
  
  if (!usuario) return false;
  if (usuario.password !== passwordActual) return false;
  
  usuario.password = nuevaPassword;
  return true;
}

// Obtener reseñas del usuario (simulado)
getResenasUsuario(userId: number): any[] {
  // Esto debería venir de un servicio de reseñas
  return [
    {
      id: 1,
      productoId: 1,
      productoNombre: 'Vestido Floral',
      calificacion: 5,
      comentario: 'Excelente producto, muy bonito',
      fecha: new Date(Date.now() - 86400000)
    },
    {
      id: 2,
      productoId: 2,
      productoNombre: 'Blusa Satinada',
      calificacion: 4,
      comentario: 'Buena calidad, la tela es suave',
      fecha: new Date(Date.now() - 172800000)
    }
  ];
}

}