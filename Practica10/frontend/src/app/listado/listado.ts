import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../services/game';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado.html',
  styleUrls: ['./listado.css']
})
export class ListadoComponent implements OnInit {
  games: any[] = [];
  constructor(private gameService: GameService) {}
  ngOnInit() {
    this.loadGames();
  }
  loadGames() {
    console.log('Cargando listado de juegos...');
    this.gameService.getGames().subscribe({
      next: (data) => {
        this.games = data;
        console.log('Juegos cargados en listado:', this.games);
      },
      error: (error) => {
        console.error('Error al cargar juegos:', error);
      }
    });
  }
  deleteGame(id: string) {
    if (confirm('¿Seguro que deseas eliminar este videojuego?')) {
      console.log('Eliminando juego con ID:', id);
      this.gameService.deleteGame(id).subscribe({
        next: (response) => {
          console.log('Respuesta:', response);
          alert('Juego eliminado correctamente');
          this.loadGames();
        },
        error: (error) => {
          console.error('Error al eliminar:', error);
          alert('Error al eliminar el juego');
        }
      });
    }
  }
}