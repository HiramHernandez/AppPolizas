import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialComponentsModule } from './material-components/material-components.module';

import { ProgressComponent } from './micromcomponents/progress/progress.component';
import { EmpleadoModalComponent } from 'src/app/components/modals/empleado-modal/empleado-modal.component';
import { PolizasComponent } from './components/pages/polizas/polizas.component';
import { EmpleadosComponent } from './components/pages/empleados/empleados.component';
import { PolizaModalComponent } from './components/modals/poliza-modal/poliza-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ProgressComponent,
    EmpleadoModalComponent,
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
