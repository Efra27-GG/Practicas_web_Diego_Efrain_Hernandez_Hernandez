import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  
import { AlumnosService } from '../services/alumnos'; 

@Component({
  selector: 'app-formulario', 
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.html'
})
export class FormularioComponent {
  
  constructor(private alumnosService: AlumnosService) {} 

  guardarAlumno(form: NgForm) {
    if (form.invalid) return;  

    const nuevoAlumno = {
      nombre: form.value.nombre,
      edad: form.value.edad,
      carrera: form.value.carrera
    };

    this.alumnosService.agregarAlumno(nuevoAlumno).subscribe({
      next: () => {
        alert('Alumno insertado correctamente');
        form.reset();
      },
      error: (err) => {
        console.error('Error al insertar:', err);
      }
    });
  }
}