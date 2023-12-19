import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IEmpleado } from 'src/app/interfaces/empleado.interface';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { SnackMsgService } from 'src/app/services/snack-msg.service';
import { MatDialogRef } from '@angular/material/dialog';
import { EnviarEmpleadoService } from 'src/app/services/enviar-empleado.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-empleados-search',
  templateUrl: './empleados-search.component.html',
  styleUrls: ['./empleados-search.component.css']
})
export class EmpleadosSearchComponent {
  empleados: IEmpleado[] = [];
  columnasTabla: string[] = ["idEmpleado", "codigoEmpleado", "nombre"];
  dataInicio: IEmpleado[] = [];
  isLoading: boolean = true;
  messageProgress: string = "Espere por favor, cargando empleados";
  dataListaEmpleados = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  private resultadoSubject = new Subject<string>();
  resultadoObservable = this.resultadoSubject.asObservable();

  constructor(private empleadoServ: EmpleadoService,
    private snackMsg: SnackMsgService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EmpleadosSearchComponent>,
    private enviarEmpleadoServ: EnviarEmpleadoService){}
  
    ngOnInit(): void {
      this.traerEmpleados();
    }

  ngAfterViewInit(): void {
    this.dataListaEmpleados.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaEmpleados.filter = filterValue.trim().toLocaleLowerCase();
  }

  traerEmpleados(){
    this.empleadoServ.getEmpleados().subscribe({
      next: (resp) => {
        /*if(resp.success){
          this.dataListaEmpleados.data = resp.data;
        }*/
      },
      complete: () => {
        this.isLoading = false;
      },
    })
  }

  seleccionar(empleado: IEmpleado) {
    this.enviarEmpleadoServ.setEmpleado(empleado);
    this.resultadoSubject.next(`Código: ${empleado.codigoEmpleado} Nombre: ${empleado.nombre}`);
    this.dialogRef.close();
  }

}
