import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ofertas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ofertas.html',
  styleUrls: ['./ofertas.css']
})
export class Ofertas {
  productos = [1,2,3,4,5,6];
  tallas = ['Chica', 'Mediana', 'Grande', 'Extra Grande'];
}