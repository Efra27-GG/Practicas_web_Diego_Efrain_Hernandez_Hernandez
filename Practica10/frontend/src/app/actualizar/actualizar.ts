import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService } from '../services/game';

@Component({
  selector: 'app-actualizar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizar.html',
  styleUrls: ['./actualizar.css']})
export class ActualizarComponent implements OnInit {
  games: any[] = [];
  selectedGame: any = null;
  constructor(private gameService: GameService) {}
  ngOnInit() {
    this.loadGames();
  }
  loadGames() {
    this.gameService.getGames().subscribe({
      next: (data) => {
        this.games = data;
        console.log('Juegos cargados en actualizar:', this.games);
      },
      error: (error) => {
        console.error('Error al cargar juegos:', error);
      }
    });
  }
  selectGame(game: any) {
    this.selectedGame = { ...game };
  }
  updateGame() {
    if (!this.selectedGame) return;    
    this.gameService.updateGame(this.selectedGame._id, this.selectedGame).subscribe({
      next: () => {
        alert('Juego actualizado correctamente');
        this.loadGames();
        this.selectedGame = null;
      },
      error: (error) => {
        console.error('Error al actualizar:', error);
        alert('Error al actualizar el juego');
      }
    });
  }
  cancelEdit() {
    this.selectedGame = null;
  }
}