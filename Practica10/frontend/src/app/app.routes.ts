import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { FormularioComponent } from './formulario/formulario';
import { ListadoComponent } from './listado/listado';
import { ActualizarComponent } from './actualizar/actualizar';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'agregar', component: FormularioComponent },
  { path: 'listado', component: ListadoComponent },
  { path: 'actualizar', component: ActualizarComponent }
];