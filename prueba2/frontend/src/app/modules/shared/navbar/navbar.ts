import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { NotificacionService } from '../../../services/notificacion.service'; // ← IMPORTAR

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit {
  noLeidas: number = 0;

  constructor(
    public authService: AuthService,
    private notificacionService: NotificacionService
  ) {}

  ngOnInit() {
    // Actualizar contador cuando cambie el usuario
    this.authService.currentUser$.subscribe(() => {
      this.noLeidas = this.notificacionService.getNoLeidas();
    });
  }
}