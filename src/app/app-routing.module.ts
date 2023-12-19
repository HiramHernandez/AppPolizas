import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmpleadosComponent } from './pages/list-empleados/list-empleados.component';
import { CuentasPorCobrarComponent } from './pages/cuentas-por-cobrar/cuentas-por-cobrar.component';
import { PolizasComponent } from './components/pages/polizas/polizas.component';

const routes: Routes = [
  { path: "empleados", component: ListEmpleadosComponent },
  { path: "polizas", component: PolizasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
