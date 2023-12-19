import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IEmpleadoResponse } from 'src/app/interfaces/models.interfaces';
import { IInventarioResponse } from 'src/app/interfaces/models.interfaces';
import { SnackMsgService } from 'src/app/services/snack-msg.service';
import { SwalMensaje } from 'src/app/utility/swalmessage';
import { PolizaService } from 'src/app/services/poliza.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { InventarioService } from 'src/app/services/inventario.service';
import { ApiConstants } from 'src/app/constants/api.constants';
import { IPolizaDataForm } from 'src/app/interfaces/models.interfaces';

@Component({
  selector: 'app-poliza-modal',
  templateUrl: './poliza-modal.component.html',
  styleUrls: ['./poliza-modal.component.css']
})
export class PolizaModalComponent {
  empleados: IEmpleadoResponse[] = [];
  inventarios: IInventarioResponse[] = [];

  formularioPoliza: FormGroup;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";
  idRolSelected: number = 0;

  constructor(
    private polizaService: PolizaService,
    private empleadoService: EmpleadoService,
    private inventarioService: InventarioService,
    private snackService: SnackMsgService,
    private modalActual: MatDialogRef<PolizaModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    private datosPoliza: IPolizaDataForm,
    private fb: FormBuilder
  ) {
    this.formularioPoliza = fb.group({
      EmpleadoGenero: ["", Validators.required],
      SKU: ["", Validators.required],
      Cantidad: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.cargarEmpleados();
    this.cargarInventarios();
    if (this.datosPoliza != null) {
      this.mostrarPoliza();
      this.botonAccion = "Modificar";
      this.tituloAccion = "Modificar";
    }
  }

  cargarEmpleados() {
    this.empleadoService.Get().subscribe({
      next: (resp) => {
        if (resp.meta.status === ApiConstants.MESSAGE_OK) {
          this.empleados = resp.data;
        }
      },
      error: (error) => {
        SwalMensaje.mostrarError("Poliza", "Hubo un error al obtener los empleados");
      },
    });
  }

  cargarInventarios() {
    this.inventarioService.GetInventarios().subscribe({
      next: (resp) => {
        if (resp.meta.status === ApiConstants.MESSAGE_OK) {
          this.inventarios = resp.data;
        }
      },
      error: (error) => {
        SwalMensaje.mostrarError("Poliza", "Hubo un error al obtener los inventarios");
      },
    });
  }

  mostrarPoliza() {
    this.formularioPoliza.patchValue({
      EmpleadoGenero: this.datosPoliza.empleadoGenero,
      SKU: this.datosPoliza.sku,
      Cantidad: this.datosPoliza.cantidad
    });
  }

  guardarOEditar() {
    const body: IPolizaDataForm = {
      idPoliza: this.datosPoliza != null ? this.datosPoliza.idPoliza : 0,
      empleadoGenero: this.formularioPoliza.value.EmpleadoGenero,
      sku: this.formularioPoliza.value.SKU,
      cantidad: this.formularioPoliza.value.Cantidad
    }
    if (this.datosPoliza != null) {
      this.polizaService.EditPoliza(body).subscribe({
        next: (resp) => {
          if (resp.meta.status === ApiConstants.MESSAGE_OK) {
            this.snackService.mostrarMsg("Se Actualizó la poliza", "exito");
            this.modalActual.close(true);
          } else {
            SwalMensaje.mostrarError("Polizas", "Error al actulizar la poliza");
          }
        }
      });
    }
    else {
      this.polizaService.SavePoliza(body).subscribe({
        next: (resp) => {
          if (resp.meta.status === ApiConstants.MESSAGE_OK) {
            this.snackService.mostrarMsg("Se guardó la poliza", "exito");
            this.modalActual.close(true);
          } else {
            SwalMensaje.mostrarError("Polizas", "Error al guardar la poliza");
          }
        }
      });
    }

  }
}
