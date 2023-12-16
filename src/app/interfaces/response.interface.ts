import { IDetalleArticuloInfo, IEmpleado, IEmpleadoInfo, IPolizaInfo } from "./models.interfaces"

export interface IResponse<T>{
    data: T,
    Meta: IMeta
}

export interface IMeta{
    Status: string
}

export interface IPolizaResponse{
    Poliza: IPolizaInfo,
    Empleado: IEmpleadoInfo,
    DetalleArticulo: IDetalleArticuloInfo
}

