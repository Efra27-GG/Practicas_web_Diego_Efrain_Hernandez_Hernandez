import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
declare var bootstrap: any;

@Component({
selector: 'app-contacto',
imports: [FormsModule, CommonModule],
templateUrl: './contacto.html',
styleUrl: './contacto.css',
})





export class Contacto {
tituloModal = '';
mensajeModal = '';
soloLetras(event: any) {
const valor = event.target.value;
event.target.value = valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
}

procesarFormulario(form: NgForm) {
if (form.invalid) {
this.tituloModal = 'Error';
this.mensajeModal = 'Completa correctamente todos los campos.';
} else {
this.tituloModal = 'Éxito';
this.mensajeModal = 'Formulario enviado correctamente.';
form.resetForm();
}
const modal = document.getElementById('modalResultado');
if (modal) {
new bootstrap.Modal(modal).show();
}
}
}