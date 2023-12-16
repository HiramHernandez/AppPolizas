import { Component, OnInit, Inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ICuentaPorPagar, ICuentaPorPagarRead, ICuentaPorPagarUpdate } from 'src/app/interfaces/cuentas-por-pagar.interface';
import { IEmpleado } from 'src/app/interfaces/empleado.interface';
import { CuentasPorCobrarService } from 'src/app/services/cuentas-por-cobrar.service';
import { SnackMsgService } from 'src/app/services/snack-msg.service';
import { SwalMensaje } from 'src/app/utility/swalmessage';
import { EnviarEmpleadoService } from 'src/app/services/enviar-empleado.service';
@Component({
  selector: 'app-ctas-por-cobrar-modal',
  templateUrl: './ctas-por-cobrar-modal.component.html',
  styleUrls: ['./ctas-por-cobrar-modal.component.css']
})
export class CtasPorCobrarModalComponent {
  formularioCuenta: FormGroup;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";
  idRolSelected: number = 0;
  cargarRoles: boolean = false;
  empleadoRecibido!: IEmpleado;

  constructor(
    private cuentaPorCobrarServ: CuentasPorCobrarService,
    private snackMsgServ: SnackMsgService,
    private modalActual: MatDialogRef<CtasPorCobrarModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public datosCuenta: ICuentaPorPagar,
    private fb: FormBuilder,
    private enviarEmpSer: EnviarEmpleadoService
  ){
    this.formularioCuenta = fb.group({
      folio: ["", Validators.required ],
      monto: ["", Validators.required ]
    });
  }


  ngOnInit(): void {
    //Se tiene que recibir el empleado
    this.empleadoRecibido = this.enviarEmpSer.getEmpleado();
    if(this.datosCuenta != null){
      this.mostrarCuenta();
      this.botonAccion="Modificar";
      this.tituloAccion = "Modificar";
    }
  }

  mostrarCuenta(){
    this.formularioCuenta.patchValue({
      folio: this.datosCuenta.folio,
      monto: this.datosCuenta.monto,
    });
  }

  
  guardarOEditar(){
    if(this.datosCuenta == null)
    {
      const nuevaCuenta: ICuentaPorPagar = {
        folio: this.formularioCuenta.value.folio,
        monto: this.formularioCuenta.value.monto,
        fechaCreacion: "2023-08-24T23:24:51.331Z",
        activo: true,
        idEmpleado: this.empleadoRecibido.idEmpleado
      };
  
      this.cuentaPorCobrarServ.add(nuevaCuenta).subscribe({
        next: resp => {
          if(resp.success){
            this.snackMsgServ.mostrarMsg("Se guardo una nueva cuenta por cobrar", "cuentas por cobrar");
            this.modalActual.close(true);
          } else{
            SwalMensaje.mostrarAlerta("Alert", `Preste atención: ${resp.message}`);
          }
        }, 
        error: err => {
          console.error(err)
          this.snackMsgServ.mostrarMsg("Ocurrio un error al guardar, porfavor intenta más tarde", "empleados");
        }
      });
    }
    else 
    {
      const cambiosCuenta: ICuentaPorPagarUpdate = {
        folio: this.formularioCuenta.value.folio,
        fechaModificacion: "2023-08-24T23:24:51.331Z",
        monto: this.formularioCuenta.value.monto,
        idEmpleado: this.empleadoRecibido.idEmpleado
      }
      this.cuentaPorCobrarServ.edit(cambiosCuenta, 17).subscribe({
        next: (resp) => {
          if(resp.success){
            this.snackMsgServ.mostrarMsg("Se edito la cuenta por cobrar", "cuentas por cobrar");
            this.modalActual.close(true);
          }else{
            SwalMensaje.mostrarAlerta("Alert", `Preste atención: ${resp.message}`);
          }
        }
      });
    }

  }



}
