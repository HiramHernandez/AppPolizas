
import { Component, OnInit, Inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IEmpleado, IReadEmpleado } from 'src/app/interfaces/empleado.interface';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { SnackMsgService } from 'src/app/services/snack-msg.service';
import { SwalMensaje } from 'src/app/utility/swalmessage';

@Component({
  selector: 'app-empleado-modal',
  templateUrl: './empleado-modal.component.html',
  styleUrls: ['./empleado-modal.component.css']
})
export class EmpleadoModalComponent implements OnInit {
  formularioEmpleado: FormGroup;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";
  idRolSelected: number = 0;
  cargarRoles: boolean = false;

  constructor(
    private empleadoService: EmpleadoService,
    private snackMsgServ: SnackMsgService,
    private modalActual: MatDialogRef<EmpleadoModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public datosEmpleado: IEmpleado,
    private fb: FormBuilder
  ) {
    this.formularioEmpleado = fb.group({
      codigoEmpleado: ["", Validators.required ],
      nombre: ["", Validators.required ],
      puesto: ["", Validators.required ]
    });
   }

  ngOnInit(): void {
    if(this.datosEmpleado != null){
      this.mostrarEmpleado();
      this.botonAccion="Modificar";
      this.tituloAccion = "Modificar";
    }
  }

  mostrarEmpleado(){
    this.formularioEmpleado.patchValue({
      codigoEmpleado: this.datosEmpleado.codigoEmpleado,
      nombre: this.datosEmpleado.nombre,
      puesto: this.datosEmpleado.puesto
    });
  }

  
  guardarOEditar(){
    if(this.datosEmpleado == null)
    {
      const empleadoNuevo: IReadEmpleado = {
        codigoEmpleado: this.formularioEmpleado.value.codigoEmpleado,
        nombre: this.formularioEmpleado.value.nombre,
        activo: true,
        puesto: this.formularioEmpleado.value.puesto
      };
  
      this.empleadoService.addEmpleado(empleadoNuevo).subscribe({
        next: resp => {
          /*if(resp.success){
            this.snackMsgServ.mostrarMsg("Se guardo un nuevo empleado", "empleados");
            this.modalActual.close(true);
          } else{
            SwalMensaje.mostrarAlerta("Alert", `Preste atención: ${resp.message}`);
          }*/
        }, 
        error: err => {
          console.error(err)
          this.snackMsgServ.mostrarMsg("Ocurrio un error al guardar, porfavor intenta más tarde", "empleados");
        }
      });
    }
    else 
    {
      const empleado: IReadEmpleado = {
        codigoEmpleado: this.formularioEmpleado.value.codigoEmpleado,
        nombre: this.formularioEmpleado.value.nombre,
        activo: true,
        puesto: this.formularioEmpleado.value.puesto
      }
      this.empleadoService.editEmpleado(empleado, this.datosEmpleado.idEmpleado).subscribe({
        next: (resp) => {
          /*if(resp.success){
            this.snackMsgServ.mostrarMsg("Se edito el empleado", "empleados");
            this.modalActual.close(true);
          }else{
            SwalMensaje.mostrarAlerta("Alert", `Preste atención: ${resp.message}`);
          }*/
        }
      });
    }

  }

  changeRol($event: any) {
    this.idRolSelected = $event.value;
  }

  handleRol(){
  }

  convertirAMayusculas(controlName: string) {
    const control = this.formularioEmpleado.get(controlName);
    if (control?.value) {
      control.setValue(control.value.toUpperCase());
    }
  }

}


