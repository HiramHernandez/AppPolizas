import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialComponentsModule } from './material-components/material-components.module';

import { ListEmpleadosComponent } from './pages/list-empleados/list-empleados.component';
import { ProgressComponent } from './micromcomponents/progress/progress.component';
import { EmpleadoModalComponent } from './modals/empleado-modal/empleado-modal.component';
import { CuentasPorCobrarComponent } from './pages/cuentas-por-cobrar/cuentas-por-cobrar.component';
import { EmpleadosSearchComponent } from './modals/empleados-search/empleados-search.component';
import { CtasPorCobrarModalComponent } from './modals/ctas-por-cobrar-modal/ctas-por-cobrar-modal.component';
import { PolizasComponent } from './components/pages/polizas/polizas.component';
import { EmpleadosComponent } from './components/pages/empleados/empleados.component';
import { PolizaModalComponent } from './components/modals/poliza-modal/poliza-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ListEmpleadosComponent,
    ProgressComponent,
    EmpleadoModalComponent,
    CuentasPorCobrarComponent,
    EmpleadosSearchComponent,
    CtasPorCobrarModalComponent,
    PolizasComponent,
    EmpleadosComponent,
    PolizaModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
