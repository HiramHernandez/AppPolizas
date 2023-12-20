import { ITableColumn } from "../interfaces/table-column.interface";

export const POLIZA_COLUMNS: ITableColumn[] = [
    { clave: 'idPoliza', titulo: 'Id Poliza', hidden: true },
    { clave: 'cantidad', titulo: 'Cantidad' },
    { clave: 'empleado', titulo: 'Empleado' },
    { clave: 'sku', titulo: 'SKU' },
    { clave: 'articulo', titulo: 'Articulo' },
    { clave: 'acciones', titulo: 'Acciones', tipo: 'acciones' },
];

export const EMPLEADO_COLUMNS: ITableColumn[] = [
    { clave: 'idEmpleado', titulo: 'Id Empleado', hidden: true },
    { clave: 'nombre', titulo: 'Nombre' },
    { clave: 'apellido', titulo: 'Apellido' },
    { clave: 'puesto', titulo: 'Puesto' },
    { clave: 'acciones', titulo: 'Acciones', tipo: 'acciones' },
];

export const INVENTARIO_COLUMNS: ITableColumn[] = [
    { clave: 'idInventario', titulo: 'Id Invenatio', hidden: true },
    { clave: 'sku', titulo: 'SKU' },
    { clave: 'nombre', titulo: 'Nombre' },
    { clave: 'cantidad', titulo: 'Cantidad' },
    { clave: 'acciones', titulo: 'Acciones', tipo: 'acciones' },
];
