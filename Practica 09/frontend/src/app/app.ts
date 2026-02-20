import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from './formulario/formulario';
import { TablaComponent } from './tabla/tabla';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormularioComponent, TablaComponent],
  templateUrl: './app.html'
})
export class AppComponent {
  title = 'P9-frontend';
}