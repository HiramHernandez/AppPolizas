import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { IResponse } from '../interfaces/response.interface';
import { IPolizaResponse } from '../interfaces/response.interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PolizaService {
  
  constructor(private _http: HttpClient) { }

  GetPolizas(): Observable<IResponse<IPolizaResponse[]>>{
    return this._http.get<IResponse<IPolizaResponse[]>>(`${environment.api}/poliza`);
  }

}
