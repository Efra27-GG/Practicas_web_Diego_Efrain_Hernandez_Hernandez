import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.authService.login(this.email, this.password)) {
      const user = this.authService.getCurrentUser();
      if (user?.role === 'admin' || user?.role === 'superadmin') {
        this.router.navigate(['/admin/home']);
      } else {
        this.router.navigate(['/home']);
      }
    } else {
      this.error = 'Email o contraseña incorrectos';
    }
  }
}