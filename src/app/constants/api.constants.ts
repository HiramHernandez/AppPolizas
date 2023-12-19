export abstract class ApiConstants{
    // ENDPOINTS
    static readonly GET_ALL_POLIZAS = "/poliza";
    static readonly GET_POLIZA_BY_ID = "/poliza/@IdPoliza";
    static readonly GET_POLIZA_BY_EMPLEADO = "/poliza/empleado/@IdEmpleado";

    // MESSAGES
    static readonly MESSAGE_OK = "Ok";
    static readonly MESSAGE_FAILURE = "Failure";
    static readonly MESSAGE_CREATE = "CREATED";
    static readonly MESSAGE_INTERNAL_ERRROR = "INTERNAL ERROR SERVER";

     static readonly MESSAGE_QUERY_FAILURE = "Ha ocurrido un error al consultar la póliza.";
}