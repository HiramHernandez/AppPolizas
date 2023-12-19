export interface IEmpleadoResponse{
    idEmpleado: number,
	nombre: string,
	apellido: string,
	puesto: string
}

export interface IInventarioResponse{
    idInventario: number,
    cantidad: number,
    sku: number,
    nombre: string
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

export interface IPolizaDataForm{
    idPoliza: number,
    empleadoGenero: number,
    sku: number,
    cantidad: number
}

export interface IEmpleadoData{
    idEmpleado: number,
    nombre: string,
    apellido: string,
    puesto: string,		
}