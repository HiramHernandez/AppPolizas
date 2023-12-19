export interface ITableColumn {
    clave: string;
    titulo: string;
    transformador?: (valor: any) => string;
    tipo?: string;
}