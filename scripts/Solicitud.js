export class Solicitud {
    constructor(nombre, apellidos, email, telefono, tipoEvento, especificarEvento, lugar, fecha) {
        this.id = Solicitud.generarIdUnico(); // Llamamos al método estático para generar un ID único
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.telefono = telefono;
        this.tipoEvento = tipoEvento;
        this.especificarEvento = especificarEvento;
        this.lugar = lugar;
        this.fecha = fecha;
    }

    // Método estático para generar un ID único
    static generarIdUnico() {
        // Utiliza el timestamp actual y un valor aleatorio para generar un ID único
        return 'id-' + new Date().getTime() + '-' + Math.floor(Math.random() * 1000);
    }
}