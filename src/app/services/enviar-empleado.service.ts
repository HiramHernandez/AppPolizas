import { Injectable } from '@angular/core';
import { IEmpleado } from '../interfaces/empleado.interface';

@Injectable({
  providedIn: 'root'
})
export class EnviarEmpleadoService {
  private empleadoSeleccionado!: IEmpleado;
  constructor() { }

  setEmpleado(empleado: IEmpleado)
  {
    this.empleadoSeleccionado = empleado;
  }

  getEmpleado(): IEmpleado
  {
    return this.empleadoSeleccionado;
  }

}
