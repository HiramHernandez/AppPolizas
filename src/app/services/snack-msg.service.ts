import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackMsgService {

  constructor(private _snackBar: MatSnackBar) { }

  mostrarMsg(message: string, tipo: string){
    this._snackBar.open(message, tipo, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }

}
