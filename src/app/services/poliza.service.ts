import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { IResponse, IPolizaResponse, IResponseDataMessage, } from '../interfaces/response.interface';
import { IPolizaDataForm } from '../interfaces/models.interfaces';
import { environment } from 'src/environments/environment';

import { ApiConstants } from '../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class PolizaService {
  
  constructor(private _http: HttpClient) { }

  GetPolizas(): Observable<IResponse<IPolizaResponse[]>>{
    return this._http.get<IResponse<IPolizaResponse[]>>(`${environment.api}${ApiConstants.GET_ALL_POLIZAS}`);
  }

  SavePoliza(body: IPolizaDataForm): Observable<IResponse<IPolizaResponse[]>>{
    return this._http.post<IResponse<IPolizaResponse[]>>(`${environment.api}${ApiConstants.POST_POLIZA}`, body);
  }

  EditPoliza(body: IPolizaDataForm): Observable<IResponse<IResponseDataMessage>>{
    let url = ApiConstants.PUT_POLIZA.replace("@IdPoliza", body.idPoliza.toString());
    return this._http.put<IResponse<IResponseDataMessage>>(url, body);
  }

}
