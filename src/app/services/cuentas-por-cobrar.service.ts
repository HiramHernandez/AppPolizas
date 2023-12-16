import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { ICuentaPorPagar, ICuentaPorPagarRead, ICuentaPorPagarUpdate } from '../interfaces/cuentas-por-pagar.interface';
import { IResponse } from '../interfaces/response.interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CuentasPorCobrarService {
  urlApi: string = `${environment.apiUlr}`;
  //así esta la api:
  //"http://localhost:9110"
  constructor(private _http: HttpClient) { }

  getCuentas(desde: string, hasta: string): Observable<IResponse<ICuentaPorPagarRead[]>>
  {
    let url: string = `${this.urlApi}/CuentaPorCobrar/desde/${desde}/hasta/${hasta}/cuentas-por-cobrar`;
    return this._http.get<IResponse<ICuentaPorPagarRead[]>>(url);
  }

  getById(id: number): Observable<IResponse<ICuentaPorPagarRead>>
  {
    return this._http.get<IResponse<ICuentaPorPagarRead>>(`${this.urlApi}/CuentaPorCobrar/${id}`);
  }


  add(cuentaPorCobrar: ICuentaPorPagar):  Observable<IResponse<ICuentaPorPagarRead>>
  {
    return this._http.post<IResponse<ICuentaPorPagarRead>>(`${this.urlApi}/CuentaPorCobrar/Add`, cuentaPorCobrar);
  }

  edit(cuentaPorCobrar: ICuentaPorPagarUpdate, id: number): Observable<IResponse<ICuentaPorPagarRead>>
  {
    return this._http.put<IResponse<ICuentaPorPagarRead>>(`${this.urlApi}/CuentaPorCobrar/${id}`, cuentaPorCobrar);
  }

}
