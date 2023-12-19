import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ICuentaPorPagar, ICuentaPorPagarRead, ICuentaPorPagarUpdate } from 'src/app/interfaces/cuentas-por-pagar.interface';
import { IEmpleado } from 'src/app/interfaces/empleado.interface';
import { CuentasPorCobrarService } from 'src/app/services/cuentas-por-cobrar.service';
import { SnackMsgService } from 'src/app/services/snack-msg.service';
import { SwalMensaje } from 'src/app/utility/swalmessage';
import { EnviarEmpleadoService } from 'src/app/services/enviar-empleado.service';
import { PolizaService } from 'src/app/services/poliza.service';
@Component({
  selector: 'app-poliza-modal',
  templateUrl: './poliza-modal.component.html',
  styleUrls: ['./poliza-modal.component.css']
})
export class PolizaModalComponent {
  formularioPoliza: FormGroup;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";
  idRolSelected: number = 0;

  constructor(
    private polizaService: PolizaService,
    private snackService: SnackMsgService,
    private modalActual: MatDialogRef<PolizaModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    private datosPoliza: any,
    private fb: FormBuilder
    ){
      this.formularioPoliza  = fb.group({
        EmpleadoGenero: ["", Validators.required ],
        SKU: ["", Validators.required ],
        Cantidad: ["", Validators.required ],
      });
    }

    ngOnInit(){
      if(this.datosPoliza != null){
        this.mostrarPoliza();
        this.botonAccion="Modificar";
        this.tituloAccion = "Modificar";
      }
    }

    mostrarPoliza(){

    }

    guardarOEditar(){
      
    }

  /*
  <form [formGroup]="formularioPoliza">
        <mat-grid-list cols="1" rowHeight="80px">
            <mat-grid-tile>
                <mat-form-field appearance="outline">
                    <mat-label>Empleado</mat-label>
                    <input matInput autocomplete="off" formControlName="EmpleadoGenero">       
                </mat-form-field>
            </mat-grid-tile>       
            <mat-grid-tile>
                <mat-form-field appearance="outline">
                    <mat-label>SKU</mat-label>
                    <input matInput type="number" autocomplete="off" formControlName="SKU">       
                </mat-form-field>
            </mat-grid-tile>
            <mat-grid-tile>
                <mat-form-field appearance="outline">
                    <mat-label>CANTIDAD</mat-label>
                    <input matInput type="number" autocomplete="off" formControlName="Cantidad">       
                </mat-form-field>
            </mat-grid-tile>
        </mat-grid-list>
    </form>
  */

}
