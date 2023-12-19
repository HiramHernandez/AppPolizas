export interface IEmpleadoResponse{
    idEmpleado: number,
	nombre: string,
	apellido: string,
	puesto: string
}

export interface IPolizaInfo{
    cantidad: number,
    idpoliza: number
}

export interface IDetalleArticuloInfo{
    nombre: string,
    sku: string
}

export interface IEmpleadoInfo{
    nombre: string
    apellido: string
}


export interface IPolizaRenderTabla{
    idPoliza: number,
    cantidad: number,
    empleado: string,
    sku: number,
    articulo: string
}