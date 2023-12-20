import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolizasComponent } from './components/pages/polizas/polizas.component';
import { EmpleadosComponent } from './components/pages/empleados/empleados.component';
import { InventariosComponent } from './components/pages/inventarios/inventarios.component';

const routes: Routes = [
  { path: "empleados", component: EmpleadosComponent },
  { path: "polizas", component: PolizasComponent },
  { path: "inventarios", component: InventariosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
