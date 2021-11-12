import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashComponent } from './dash/dash.component';
import { NuevoDestinatarioComponent } from './feature/nuevo-destinatario/nuevo-destinatario.component';
import { NuevaTransferenciaComponent } from './feature/nueva-transferencia/nueva-transferencia.component';
import { HistorialComponent } from './feature/historial/historial.component';

const routes: Routes = [
  { path: 'dashboard',
    component: DashComponent },
  {
    path: 'nuevo-destinatario',
    component: NuevoDestinatarioComponent
  },
  {
    path: 'nueva-transferencia',
    component: NuevaTransferenciaComponent
  },
  {
    path: 'historial',
    component: HistorialComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
