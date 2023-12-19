import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { IResponse } from '../interfaces/response.interface';
import { IPolizaResponse } from '../interfaces/response.interface';
import { environment } from 'src/environments/environment';

import { ApiConstants } from '../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class PolizaService {
  
  constructor(private _http: HttpClient) { }

  GetPolizas(): Observable<IResponse<IPolizaResponse[]>>{
    let idEmpleado: number = 1;
    const url: string = ApiConstants.GET_POLIZA_BY_EMPLEADO.replace("@IdEmpleado", idEmpleado.toString());
    console.log(url);
    return this._http.get<IResponse<IPolizaResponse[]>>(`${environment.api}/poliza`);
  }

}
