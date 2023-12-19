import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PolizaModalComponent } from '../../modals/poliza-modal/poliza-modal.component';
import { SwalMensaje } from 'src/app/utility/swalmessage';
import { EnviarEmpleadoService } from 'src/app/services/enviar-empleado.service';
import { IEmpleado } from 'src/app/interfaces/empleado.interface';

import { IPolizaRenderTabla } from 'src/app/interfaces/models.interfaces';
import { IPolizaResponse } from 'src/app/interfaces/response.interface';
import { IPolizaDataForm } from 'src/app/interfaces/models.interfaces';

import { PolizaService } from 'src/app/services/poliza.service';
import { SnackMsgService } from 'src/app/services/snack-msg.service';
import { ApiConstants } from 'src/app/constants/api.constants';
import { POLIZA_COLUMNS } from 'src/app/constants/tables.constants';
import { TableUtils } from 'src/app/utility/table.utils';

@Component({
  selector: 'app-polizas',
  templateUrl: './polizas.component.html',
  styleUrls: ['./polizas.component.css']
})
export class PolizasComponent {
  isLoading: boolean = true;
  messageProgress: string = "Espere por favor, cargando las polizas";

  empleadoSeleccionado!: IEmpleado;

  startDate: Date = new Date();
  endDate: Date = new Date();
  formato: string = 'yyyy/MM/dd';
  startDateStr: string = "";
  endDateStr: string = "";

  tableUtils: TableUtils = new TableUtils();
  dataInicio: IPolizaRenderTabla[] = [];
  dataListaCuentas = new MatTableDataSource(this.dataInicio);
  polizasData: IPolizaRenderTabla[] = [];
  columns = POLIZA_COLUMNS;
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private polizaService: PolizaService,
    private snackBarService: SnackMsgService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.GetAllPolizas();
    }, 1400);
  }

  GetAllPolizas() {
    this.polizasData = [];
    this.polizaService.GetPolizas().subscribe({
      next: (resp) => {
        if (resp.meta.status === ApiConstants.MESSAGE_OK) {
          resp.data.forEach((poliza) => {
            const polizaRenderTable = this.PolizasToTable(poliza);
            this.polizasData.push(polizaRenderTable);
          });
        } else {
          SwalMensaje.mostrarError("Polizas", "Lo sentimos no se obtuvo información");
        }
      },
      error: (error) => {
        SwalMensaje.mostrarError("Poliza", "Hubo un error al obtener las polizas");
      },
      complete: () => {
        this.isLoading = false;
        this.dataListaCuentas.data = this.polizasData;
      },
    });
  }

  PolizasToTable(poliza: IPolizaResponse): IPolizaRenderTabla {
    const polizaRenderTable: IPolizaRenderTabla = {
      idPoliza: poliza?.poliza?.idpoliza ?? 0,
      cantidad: poliza?.poliza?.cantidad ?? 0,
      empleado: `${poliza?.empleado?.nombre || ""} ${poliza?.empleado?.apellido || ""}`,
      sku: parseInt(poliza?.detalleArticulo?.sku, 10) || 0,
      articulo: poliza?.detalleArticulo?.nombre || ""
    }
    return polizaRenderTable;
  }

  ngAfterViewInit(): void {
    this.dataListaCuentas.paginator = this.paginacionTabla;
  }

  abrirBusquedaEmpleados() {
    this.dialog.open(PolizaModalComponent, {
      disableClose: false,
    }).afterClosed().subscribe(() => {
      this.GetAllPolizas();
    });
  }

  openPolizaModalDiaglo(poliza: IPolizaDataForm | null) {
    this.dialog.open(PolizaModalComponent, {
      disableClose: true,
      width: "350px",
      data: poliza
    }).afterClosed().subscribe(res => {

      if (res === true){
        this.GetAllPolizas();
      } 
    });
  }

  remove(idPoliza: number) {
    SwalMensaje.mostrarPregunta("Polizas", "¿Deseas eliminar la poliza?", "Sí, eliminar").then((resp) => {
      if (resp.isConfirmed) {
        this.polizaService.RemovePoliza(idPoliza).subscribe({
          next: (resp) => {
            if(resp.meta.status === ApiConstants.MESSAGE_OK){
              this.snackBarService.mostrarMsg(`Se elimino la polìza con id: ${idPoliza}`, "success");
              this.GetAllPolizas();
            }
            else{
              SwalMensaje.mostrarError("Eliminar Poliza", "Intente mas tarde no se pudo borrar la poliza");
            }
          },
          error: (error) => {
            SwalMensaje.mostrarError("Error", error.message);
          }
        })
      }
    });
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaCuentas.filter = filterValue.trim().toLocaleLowerCase();
  }

  buscar() {
    this.dataListaCuentas.data = [];
  }

  onFechaInicioChange(event: Date) {
    // Manejar el cambio en la fecha de inicio
    //this.startDate = event;
    //this.startDateStr = this.formatoFecha(this.startDate, this.formato);
  }

  onFechaFinChange(event: Date) {
    // Manejar el cambio en la fecha de fin
    //this.endDate = event;
    //this.endDateStr = this.formatoFecha(this.endDate, this.formato);
  }

  formatoFecha(fecha: Date, formato: string): string {
    const year = fecha.getFullYear();
    const month = fecha.getMonth() + 1; // Los meses en JavaScript son 0-indexed
    const day = fecha.getDate();

    const monthString = month < 10 ? `0${month}` : `${month}`;
    const dayString = day < 10 ? `0${day}` : `${day}`;

    return formato.replace('yyyy', year.toString())
      .replace('MM', monthString)
      .replace('dd', dayString);
  }

  mostrarEmpleado() {
    if (this.empleadoSeleccionado) {
      //this.informacionEmpleado = `Código: ${this.empleadoSeleccionado.codigoEmpleado} Nombre: ${this.empleadoSeleccionado.nombre}`;
    }
  }


}
