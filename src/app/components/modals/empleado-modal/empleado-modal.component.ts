import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IEmpleadoData } from 'src/app/interfaces/models.interfaces';
import { SwalMensaje } from 'src/app/utility/swalmessage';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { SnackMsgService } from 'src/app/services/snack-msg.service';
import { ApiConstants } from 'src/app/constants/api.constants';

@Component({
  selector: 'app-empleado-modal',
  templateUrl: './empleado-modal.component.html',
  styleUrls: ['./empleado-modal.component.css']
})
export class EmpleadoModalComponent {
  formularioEmpleado: FormGroup;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";

  constructor(
    private empleadoService: EmpleadoService,
    private snackService: SnackMsgService,
    private modalActual: MatDialogRef<EmpleadoModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    private datosEmpleado: IEmpleadoData,
    private fb: FormBuilder
  ) {
    this.formularioEmpleado = fb.group({
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      puesto: ["", Validators.required],
    });
  }

  ngOnInit() {
    if(this.datosEmpleado != null){
      this.MostrarEmpleado();
      this.botonAccion = "Modificar";
      this.tituloAccion = "Modificar";
    }
  }

  MostrarEmpleado(){
   this.formularioEmpleado.patchValue({
      nombre: this.datosEmpleado.nombre,
      apellido: this.datosEmpleado.apellido,
      puesto: this.datosEmpleado.puesto,
   });
  }

  guardarOEditar() {

    const body: IEmpleadoData = {
      idEmpleado: this.datosEmpleado != null ? this.datosEmpleado.idEmpleado : 0,
      nombre: this.formularioEmpleado.value.nombre,
      apellido: this.formularioEmpleado.value.apellido,
      puesto: this.formularioEmpleado.value.puesto
    }
    
    if(this.datosEmpleado != null){
      this.empleadoService.EditEmpleado(body).subscribe({
        next: (resp) => {
          if(resp.meta.status === ApiConstants.MESSAGE_CREATE){
            this.snackService.mostrarMsg("Se actualizo el empleado", "exito");
            this.modalActual.close(true);
          } else {
            SwalMensaje.mostrarError("Polizas", "Error al actulizar el empleado");
          }
        },
        error: (error) => {
          SwalMensaje.mostrarError("Polizas", "Error al actualizar el empleado");
        }
      });
    }
    else {
      this.empleadoService.SaveEmpleado(body).subscribe({
        next: (resp) => {
          if(resp.meta.status === ApiConstants.MESSAGE_CREATE){
            this.snackService.mostrarMsg("Se inerto el empleado", "success");
            this.modalActual.close(true);
          }
          else {
            SwalMensaje.mostrarError("Polizas", "Error al insertar el empleado");
          }
        },
        error: (error) => {
          SwalMensaje.mostrarError("Polizas", "Error al actualizar el empleado");
        }
      });
    }

  }

}
