import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmpleadoModalComponent } from 'src/app/components/modals/empleado-modal/empleado-modal.component';
import { SwalMensaje } from 'src/app/utility/swalmessage';
import { EnviarEmpleadoService } from 'src/app/services/enviar-empleado.service';
import { IEmpleado } from 'src/app/interfaces/empleado.interface';


import { EmpleadoService } from 'src/app/services/empleado.service';
import { SnackMsgService } from 'src/app/services/snack-msg.service';
import { ApiConstants } from 'src/app/constants/api.constants';
import { EMPLEADO_COLUMNS } from 'src/app/constants/tables.constants';
import { TableUtils } from 'src/app/utility/table.utils';
import { IEmpleadoData } from 'src/app/interfaces/models.interfaces';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent {
  isLoading: boolean = true;
  messageProgress: string = "Espere por favor, cargando los empleados";

  columns = EMPLEADO_COLUMNS;
  tableUtils: TableUtils = new TableUtils();
  dataInicio: IEmpleadoData[] = [];
  dataListaEmpleados = new MatTableDataSource(this.dataInicio);
  empleadosData: IEmpleadoData[] = [];
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;


  constructor(
    private dialog: MatDialog,
    private empledoService: EmpleadoService, 
    private snackBarService: SnackMsgService,
  ){}

  ngOnInit() {
    setTimeout(() => {
      this.Empleados();
    }, 800);
    
  }

  ngAfterViewInit(): void {
    this.dataListaEmpleados.paginator = this.paginacionTabla;
  }

  Empleados(){
    this.empleadosData = [];
    this.empledoService.Get().subscribe({
      next: (resp) => {
        if(resp.meta.status === ApiConstants.MESSAGE_OK){
          resp.data.forEach((emp) => {
            const empleado: IEmpleadoData = {
              idEmpleado: emp.idEmpleado,
              nombre: emp.nombre,
              apellido: emp.apellido,
              puesto: emp.puesto
            }
            this.empleadosData.push(empleado);
          });
        }
      },
      error: (error) => {
        console.log(error);
        SwalMensaje.mostrarError("Empledos", "Ocurrio un error al obtener los empleados");
      },
      complete: () => {
        this.isLoading = false;
        this.dataListaEmpleados.data = this.empleadosData;
      }
    });
  }

  openEmpleadoModal(empleado: IEmpleadoData | null){
    this.dialog.open(EmpleadoModalComponent, {
      disableClose: true,
      width: "350px",
      data: empleado
    }).afterClosed().subscribe(res => {

      if (res === true) this.Empleados();
    });
  }


  remove(empleado: IEmpleadoData){
    const nombreEmpleado: string = `${empleado.nombre} ${empleado.apellido}`
    SwalMensaje.mostrarPregunta("Eliminar", `¿Desas elimar el empleado: ${nombreEmpleado}?`, "Si, eliminar").then((res) => {
      if(res.isConfirmed){
        this.empledoService.RemoveEmpleado(empleado.idEmpleado).subscribe({
          next: (resp) =>{
            if(resp.meta.status === ApiConstants.MESSAGE_OK){
              this.snackBarService.mostrarMsg(`Se elimino el empleado: ${nombreEmpleado}`, "success");
              this.Empleados();
            }
            else{
              SwalMensaje.mostrarError("Empleados", "Hubo un error al eliminar el empleado");
            }
          },
          error: (error) => {
            console.log(error);
            SwalMensaje.mostrarError("Empleados", "Hubo un error al eliminar el empleado");
          }
        });
      }
    });
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaEmpleados.filter = filterValue.trim().toLocaleLowerCase();
  }

}
