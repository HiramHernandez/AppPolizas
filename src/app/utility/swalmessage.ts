import Swal from "sweetalert2";

export class SwalMensaje{
    static mostrarError(title: string, text: string) {
        Swal.fire({
          title: title,
          text: text,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
    }

    static mostrarAlerta(title: string, text: string) {
        Swal.fire({
          title: title,
          text: text,
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
    }


    static mostrarExito(title: string, text: string) {
        Swal.fire({
          title: title,
          text: text,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
    }

    static mostrarPregunta(title: string, text: string, textConfirmedButton: string){
      return Swal.fire({
        title: title,
        text: text,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: textConfirmedButton
      });
    }

}
