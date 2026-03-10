import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './modules/shared/navbar/navbar';
import { Footer } from './modules/shared/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'shadow-angels-frontend';
}