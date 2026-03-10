import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // ← IMPORTAR EL GUARD

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./modules/users/home/home').then(m => m.Home)
  },
  {
    path: 'dama',
    loadComponent: () => import('./modules/users/dama/dama').then(m => m.Dama)
  },
  {
    path: 'caballero',
    loadComponent: () => import('./modules/users/caballero/caballero').then(m => m.Caballero)
  },
  {
    path: 'ofertas',
    loadComponent: () => import('./modules/users/ofertas/ofertas').then(m => m.Ofertas)
  },
  {
    path: 'producto/:id',
    loadComponent: () => import('./modules/users/producto/producto').then(m => m.ProductoComponent)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./modules/users/perfil/perfil').then(m => m.Perfil)
  },
  {
    path: 'notificaciones',
    loadComponent: () => import('./modules/users/notificaciones/notificaciones').then(m => m.Notificaciones)
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/users/login/login').then(m => m.Login)
  },
  {
    path: 'registro',
    loadComponent: () => import('./modules/users/registro/registro').then(m => m.Registro)
  },
  // Rutas de admin protegidas
  {
    path: 'admin/home',
    loadComponent: () => import('./modules/admins/home/home').then(m => m.Home),
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'superadmin'] }
  },
  {
    path: 'admin/productos',
    loadComponent: () => import('./modules/admins/productos/productos').then(m => m.Productos),
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'superadmin'] }
  },
  {
    path: 'admin/productos/nuevo',
    loadComponent: () => import('./modules/admins/producto-form/producto-form').then(m => m.ProductoForm),
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'superadmin'] }
  },
  {
    path: 'admin/productos/editar/:id',
    loadComponent: () => import('./modules/admins/producto-form/producto-form').then(m => m.ProductoForm),
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'superadmin'] }
  },
  {
    path: 'admin/admins',
    loadComponent: () => import('./modules/admins/admins/admins').then(m => m.Admins),
    canActivate: [AuthGuard],
    data: { roles: ['superadmin'] }
  },
  {
    path: 'admin/perfil',
    loadComponent: () => import('./modules/admins/perfil/perfil').then(m => m.Perfil),
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'superadmin'] }
  }
];