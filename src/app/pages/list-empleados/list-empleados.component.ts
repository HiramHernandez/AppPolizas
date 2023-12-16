import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IEmpleado, IReadEmpleado } from 'src/app/interfaces/empleado.interface';
import { EmpleadoModalComponent } from 'src/app/modals/empleado-modal/empleado-modal.component';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { SnackMsgService } from 'src/app/services/snack-msg.service';
import { SwalMensaje } from 'src/app/utility/swalmessage';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent {
  empleados: IEmpleado[] = [];
  columnasTabla: string[] = ["idEmpleado", "codigoEmpleado", "nombre", "puesto", "activo", "acciones"];
  dataInicio: IEmpleado[] = [];
  isLoading: boolean = true;
  messageProgress: string = "Espere por favor, cargando empleados";
  dataListaEmpleados = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(private empleadoServ: EmpleadoService,
    private snackMsg: SnackMsgService,
    private dialog: MatDialog){}
  
    ngOnInit(): void {
      setTimeout(() => {
        this.traerEmpleados();
      }, 1000);
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
          if(resp.success){
            this.dataListaEmpleados.data = resp.data;
            console.log(this.dataInicio);
          }
        },
        complete: () => {
          this.isLoading = false;
        },
      })
    }
  
    agregarEmpleado(){
      this.dialog.open(EmpleadoModalComponent, {
        disableClose: true,
       }).afterClosed().subscribe(res => {
        if(res === true) this.traerEmpleados();
       });
    }
  
    edit(empleado: IEmpleado){
     this.dialog.open(EmpleadoModalComponent, {
      disableClose: true,
      data: empleado
     }).afterClosed().subscribe(res => {
      if(res === true) this.traerEmpleados();
     });
    }

    remove(empleado: IEmpleado){
      const msg: string = `Deseas Desactivar al empleado con nombre: ${empleado.nombre}`;
      const datosEmpleado: IReadEmpleado = {
        codigoEmpleado: empleado.codigoEmpleado,
        nombre: empleado.nombre,
        activo: false,
        puesto: empleado.puesto
      };
      SwalMensaje.mostrarPregunta("Eliminar", msg, "Sí, eliminar").then((resp) => {
        if(resp.isConfirmed){
          this.empleadoServ.editEmpleado(datosEmpleado, empleado.idEmpleado).subscribe({
            next: (response) => {
              if(response.success){
                this.snackMsg.mostrarMsg("Se desactivo", "empleados");
                this.traerEmpleados()
              }
            }, error: errr => {
              this.snackMsg.mostrarMsg("Ocurrio un error al desactivar, intente más tarde", "empleados");
            }
          });
        }
      });
    }
}
