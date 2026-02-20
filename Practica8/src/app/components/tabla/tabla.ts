import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla.html',
  styleUrls: ['./tabla.css']
})
export class Eventos implements OnInit {
  listaEventos: any[] = [];
  
  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef  
  ) {}
  
  ngOnInit() {
    console.log('Antes de la petición:', this.listaEventos);
    
    this.http.get<any[]>('http://127.0.0.1:5000/eventos')
      .subscribe(data => {
        console.log('Datos recibidos:', data);
        this.listaEventos = data;
        this.cdr.detectChanges(); 
        console.log('Después de asignar:', this.listaEventos);
      });
  }
}