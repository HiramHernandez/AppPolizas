import { IDetalleArticuloInfo, IEmpleadoInfo, IPolizaInfo } from "./models.interfaces"

export interface IResponse<T>{
    data: T,
    meta: IMeta
}

export interface IMeta{
    status: string
}

export interface IPolizaResponse{
    poliza: IPolizaInfo,
    empleado: IEmpleadoInfo,
    detalleArticulo: IDetalleArticuloInfo
}

