import { Component } from '@angular/core';
import { Eventos } from './components/tabla/tabla';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Eventos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Practica8';
}