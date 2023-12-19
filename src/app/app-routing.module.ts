import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmpleadosComponent } from './pages/list-empleados/list-empleados.component';
import { PolizasComponent } from './components/pages/polizas/polizas.component';
import { EmpleadosComponent } from './components/pages/empleados/empleados.component';

const routes: Routes = [
  { path: "empleados", component: EmpleadosComponent },
  { path: "polizas", component: PolizasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
