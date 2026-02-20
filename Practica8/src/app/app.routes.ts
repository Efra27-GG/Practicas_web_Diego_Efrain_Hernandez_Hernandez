import { Routes } from '@angular/router';
import { Eventos } from './components/tabla/tabla';

export const routes: Routes = [
    { path: '', component: Eventos }, 
    { path: 'eventos', component: Eventos }  
];