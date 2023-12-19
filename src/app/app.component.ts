import { Component, OnInit } from '@angular/core';
import { IMenu } from './interfaces/menu.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AppCuentasPorPagarEmpleados';
  menus: IMenu[] = [];

  ngOnInit(): void{
    this.menus = this.getMenus();
  }

  getMenus(): IMenu[]{
    return [
      {icon: "face", name: "Empleados" , url: "empleados"},
      {icon: "book", name: "Polizas" , url: "polizas"}
    ];
  }

}
