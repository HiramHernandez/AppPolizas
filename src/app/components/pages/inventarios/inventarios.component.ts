import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InventarioModalComponent } from '../../modals/inventario-modal/inventario-modal.component';
import { SwalMensaje } from 'src/app/utility/swalmessage';
import { InventarioService } from 'src/app/services/inventario.service';
import { SnackMsgService } from 'src/app/services/snack-msg.service';
import { ApiConstants } from 'src/app/constants/api.constants';
import { INVENTARIO_COLUMNS } from 'src/app/constants/tables.constants';
import { TableUtils } from 'src/app/utility/table.utils';
import { IInvenarioData } from 'src/app/interfaces/models.interfaces';

@Component({
  selector: 'app-inventarios',
  templateUrl: './inventarios.component.html',
  styleUrls: ['./inventarios.component.css']
})
export class InventariosComponent {
  isLoading: boolean = true;
  messageProgress: string = "Espere por favor, cargando los inventarios";

  columns = INVENTARIO_COLUMNS;
  tableUtils: TableUtils = new TableUtils();
  dataInicio: IInvenarioData[] = [];
  dataListaInvetario = new MatTableDataSource(this.dataInicio);
  invetariosData: IInvenarioData[] = [];
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private invantarioService: InventarioService,
    private snackBarService: SnackMsgService,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.Inventarios();
    }, 300);

  }

  ngAfterViewInit(): void {
    this.dataListaInvetario.paginator = this.paginacionTabla;
  }

  Inventarios() {
    
    this.invetariosData = [];
    this.invantarioService.GetInventarios().subscribe({
      next: (resp) => {
        if (resp.meta.status === ApiConstants.MESSAGE_OK) {
          resp.data.forEach((inv) => {
            const inventario: IInvenarioData = {
              idInventario: inv.idInventario,
              nombre: inv.nombre,
              sku: inv.sku,
              cantidad: inv.cantidad
            }
            
            this.invetariosData.push(inventario);
          });
        }
      },
      error: (error) => {
        console.log(error);
        SwalMensaje.mostrarError("Empledos", "Ocurrio un error al obtener los empleados");
      },
      complete: () => {
        this.isLoading = false;
        this.dataListaInvetario.data = this.invetariosData;
      }
    });
  }

  openInventarioModal(inventario: IInvenarioData | null) {
    this.dialog.open(InventarioModalComponent, {
      disableClose: true,
      width: "350px",
      data: inventario
    }).afterClosed().subscribe(res => {

      if (res === true) this.Inventarios();
    });
  }


  remove(inventario: IInvenarioData) {
    
    SwalMensaje.mostrarPregunta("Eliminar", `¿Desas elimar el empleado inventario?`, "Si, eliminar").then((res) => {
      if (res.isConfirmed) {
        /*this.empledoService.RemoveEmpleado(empleado.idEmpleado).subscribe({
          next: (resp) => {
            if (resp.meta.status === ApiConstants.MESSAGE_OK) {
              this.snackBarService.mostrarMsg(`Se elimino el empleado: ${nombreEmpleado}`, "success");
              this.Empleados();
            }
            else {
              SwalMensaje.mostrarError("Empleados", "Hubo un error al eliminar el empleado");
            }
          },
          error: (error) => {
            console.log(error);
            SwalMensaje.mostrarError("Empleados", "Hubo un error al eliminar el empleado");
          }
        });*/
      }
    });
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaInvetario.filter = filterValue.trim().toLocaleLowerCase();
  }



}
