import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { GameService } from '../services/game';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.html',
  styleUrls: ['./formulario.css']
})
export class FormularioComponent {
  game = {
    nombre: '',
    genero: '',
    precio: 0,
    imagenUrl: ''
  };

  constructor(
    private gameService: GameService,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.gameService.createGame(this.game).subscribe({
      next: (response) => {
        console.log('Videojuego agregado:', response);
        alert('Videojuego agregado correctamente');
        this.game = { nombre: '', genero: '', precio: 0, imagenUrl: '' };
        form.reset();
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error al guardar:', error);
        alert('Error al guardar el videojuego');
      }
    });
  }
}