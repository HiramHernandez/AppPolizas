import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SwalMensaje } from 'src/app/utility/swalmessage';
import { EmpleadosSearchComponent } from 'src/app/modals/empleados-search/empleados-search.component';
import { EnviarEmpleadoService } from 'src/app/services/enviar-empleado.service';
import { IEmpleado } from 'src/app/interfaces/empleado.interface';
import { CuentasPorCobrarService } from 'src/app/services/cuentas-por-cobrar.service';
import { ICuentaPorPagarRead } from 'src/app/interfaces/cuentas-por-pagar.interface';
import { CtasPorCobrarModalComponent } from 'src/app/modals/ctas-por-cobrar-modal/ctas-por-cobrar-modal.component';

@Component({
  selector: 'app-cuentas-por-cobrar',
  templateUrl: './cuentas-por-cobrar.component.html',
  styleUrls: ['./cuentas-por-cobrar.component.css']
})
export class CuentasPorCobrarComponent {
  isLoading: boolean = false;
  messageProgress: string = "Espere por favor, cargando las cuentas por cobrar";
  startDate: Date = new Date();
  endDate: Date = new Date();
  formato: string = 'yyyy/MM/dd'; 
  startDateStr: string = "";
  endDateStr: string = "";
  empleadoSeleccionado!: IEmpleado;
  informacionEmpleado: string = "";
  cuentasPorCobrar: ICuentaPorPagarRead[] = [];
  columnasTabla: string[] = ["idCuentaPorCobrar", "folio", "monto", "fechaCreacion", "fechaModificacion", "activo", "idEmpleado", "nombreEmpleado", "acciones"];
  dataInicio: ICuentaPorPagarRead[] = [];
  dataListaCuentas = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  constructor(private dialog: MatDialog,
    private enviarEmpleadoServ: EnviarEmpleadoService,
    private cuentasPorCobrarServ: CuentasPorCobrarService){}

  ngOnInit(): void {
    this.startDateStr = this.formatoFecha(this.startDate, this.formato);
    this.endDateStr = this.formatoFecha(this.endDate, this.formato);
  }

  ngAfterViewInit(): void {
    this.dataListaCuentas.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaCuentas.filter = filterValue.trim().toLocaleLowerCase();
  }

  buscar()
  {
    this.dataListaCuentas.data = [];
    const fechaInicioFormateada = this.startDateStr.replace(/\//g, '-');
    const fechaFinFormateada = this.endDateStr.replace(/\//g, '-');
    this.cuentasPorCobrarServ.getCuentas(fechaInicioFormateada, fechaFinFormateada).subscribe({
      next: (resp) => {
        this.isLoading = true;
        if(resp.success){
          this.dataListaCuentas.data = resp.data;
          console.log(this.dataListaCuentas.data);
        }
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onFechaInicioChange(event: Date) {
    // Manejar el cambio en la fecha de inicio
    this.startDate = event;
    this.startDateStr = this.formatoFecha(this.startDate, this.formato);
  }

  onFechaFinChange(event: Date) {
    // Manejar el cambio en la fecha de fin
    this.endDate = event;
    this.endDateStr = this.formatoFecha(this.endDate, this.formato);
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

  abrirBusquedaEmpleados()
  {
    this.dialog.open(EmpleadosSearchComponent, {
      disableClose: false,
     }).afterClosed().subscribe(() => {
        this.empleadoSeleccionado = this.enviarEmpleadoServ.getEmpleado();
        this.mostrarEmpleado();
      });
  }

  mostrarEmpleado()
  {
    if(this.empleadoSeleccionado)
    {
      this.informacionEmpleado = `Código: ${this.empleadoSeleccionado.codigoEmpleado} Nombre: ${this.empleadoSeleccionado.nombre}`;
    }
  }

  abrirAltaOEdicion(){
    this.enviarEmpleadoServ.setEmpleado(this.empleadoSeleccionado);
    this.dialog.open(CtasPorCobrarModalComponent, {
      disableClose: true,
     }).afterClosed().subscribe(res => {
      if(res === true) this.buscar();
     });
  }

  edit(cuenta: any)
  {

  }

  remove(cuenta: any)
  {

  }

}
