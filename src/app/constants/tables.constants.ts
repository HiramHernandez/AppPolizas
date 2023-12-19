import { ITableColumn } from "../interfaces/table-column.interface";

export const POLIZA_COLUMNS: ITableColumn[] = [
    { clave: 'idPoliza', titulo: 'Id Poliza', hidden: true },
    { clave: 'cantidad', titulo: 'Cantidad' },
    { clave: 'empleado', titulo: 'Empleado' },
    { clave: 'sku', titulo: 'SKU' },
    { clave: 'articulo', titulo: 'Articulo' },
    { clave: 'acciones', titulo: 'Acciones', tipo: 'acciones' },
];