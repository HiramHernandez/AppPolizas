import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { IEmpleado, IReadEmpleado } from '../interfaces/empleado.interface';
import { IResponse } from '../interfaces/response.interface';
import { environment } from 'src/environments/environment';
import { IEmpleadoResponse } from '../interfaces/models.interfaces';
import { ApiConstants } from '../constants/api.constants';
import { IResponseDataMessage } from '../interfaces/response.interface';
import { IEmpleadoData } from '../interfaces/models.interfaces';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  urlApi: string = `${environment.apiUlr}`;

  constructor(private _http: HttpClient) { }

  Get(): Observable<IResponse<IEmpleadoResponse[]>>{
    return this._http.get<IResponse<IEmpleadoResponse[]>>(`${environment.api}${ApiConstants.GET_EMPLEADOS}`);
  }

  SaveEmpleado(body: IEmpleadoData):  Observable<IResponse<IResponseDataMessage>>{
    return this._http.post<IResponse<IResponseDataMessage>>(`${environment.api}${ApiConstants.POST_EMPLEADO}`, body);
  }

  EditEmpleado(body: IEmpleadoData): Observable<IResponse<IResponseDataMessage>>{
    let url = ApiConstants.PUT_EMPLEADO.replace("@IdEmpleado", body.idEmpleado.toString());
    return this._http.put<IResponse<IResponseDataMessage>>(`${environment.api}${url}`, body);
  }

  RemoveEmpleado(empleadoId: number): Observable<IResponse<IResponseDataMessage>>{
    let url = ApiConstants.DELETE_EMPLEADO.replace("@IdEmpleado", empleadoId.toString());
    return this._http.delete<IResponse<IResponseDataMessage>>(`${environment.api}${url}`);
  }

  //
  //
  GetAll(): Observable<IResponse<IEmpleadoResponse[]>>{
    return this._http.get<IResponse<IEmpleadoResponse[]>>(`${environment.api}/empleados`);
  }

  getEmpleados(): Observable<IResponse<IEmpleado[]>>{
    return this._http.get<IResponse<IEmpleado[]>>(`${this.urlApi}/Empleado/empleados`);
  }

  addEmpleado(datosEmpleado: IReadEmpleado): Observable<IResponse<IEmpleado>>{
    return this._http.post<IResponse<IEmpleado>>(`${this.urlApi}/Empleado/Add`, datosEmpleado);
  }

  editEmpleado(datosEmpleado: IReadEmpleado, id: number): Observable<IResponse<IEmpleado>>{
    return this._http.put<IResponse<IEmpleado>>(`${this.urlApi}/Empleado/${id}`, datosEmpleado);
  }

}
