import { ITableColumn } from 'src/app/interfaces/table-column.interface';

export class TableUtils
{
    GetColumns(columns: ITableColumn[]): string[] 
    {
        return columns.map((column) => column.clave);
    }
    TransformValue(column: ITableColumn, value: any): string
    {
        return column.transformador ? column.transformador(value) : value;
    }
    IsActionColumn(column: ITableColumn): boolean
    {
        return column.tipo === 'acciones';
    }
}