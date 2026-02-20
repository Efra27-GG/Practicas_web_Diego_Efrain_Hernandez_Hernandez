import { Component, OnInit } from '@angular/core';  
import { CommonModule } from '@angular/common'; 
import { AlumnosService } from '../services/alumnos';  

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla.html'  
})
export class TablaComponent implements OnInit {
  alumnos: any[] = [];

  constructor(private alumnosService: AlumnosService) {}  

  ngOnInit() {
    this.cargarAlumnos();
  }

  cargarAlumnos() { 
    this.alumnosService.obtenerAlumnos().subscribe(data => {
      this.alumnos = data;
    });
  }
}