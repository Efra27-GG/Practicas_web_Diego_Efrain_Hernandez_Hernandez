import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-caballero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './caballero.html',
  styleUrls: ['./caballero.css']
})
export class Caballero {
  productos = [1,2,3,4,5,6];
  tallas = ['Chica', 'Mediana', 'Grande', 'Extra Grande'];
}