import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Contacto } from './components/contacto/contacto';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('practica_js_modal');
}