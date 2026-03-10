import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
  const user = this.authService.getCurrentUser();
  const requiredRoles = route.data['roles'] as Array<string>;
  
  console.log('AuthGuard - Usuario:', user);
  console.log('AuthGuard - Roles requeridos:', requiredRoles);

  if (!user) {
    console.log('AuthGuard - No hay usuario, redirigiendo a login');
    this.router.navigate(['/login']);
    return false;
  }

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    console.log('AuthGuard - Usuario no tiene rol requerido');
    this.router.navigate(['/home']);
    return false;
  }

  console.log('AuthGuard - Acceso permitido');
  return true;
}
}