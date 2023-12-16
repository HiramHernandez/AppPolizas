export interface ICuentaPorPagarRead
{
    idCuentaPorCobra: number,
    folio: string,
    monto: number,
    fechaCreacion: string,
    fechaModificacion: string,
    activo: boolean,
    idEmpleado: number,
    nombreEmpleado: string
}

export interface ICuentaPorPagar{
    folio: string,
    monto: number,
    fechaCreacion: string,
    activo: boolean,
    idEmpleado: number
}

export interface ICuentaPorPagarUpdate
{
    folio:string,
    monto: number,
    fechaModificacion: string,
    idEmpleado: number
}