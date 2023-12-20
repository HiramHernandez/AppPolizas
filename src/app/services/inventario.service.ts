import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { IResponse } from '../interfaces/response.interface';
import { IInventarioResponse } from '../interfaces/models.interfaces';
import { environment } from 'src/environments/environment';

import { ApiConstants } from '../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  
  constructor(private _http: HttpClient) { }

  GetInventarios(): Observable<IResponse<IInventarioResponse[]>>
  {
    return this._http.get<IResponse<IInventarioResponse[]>>(`${environment.api}${ApiConstants.GET_INVENTARIOS}`);
  }

  

}
