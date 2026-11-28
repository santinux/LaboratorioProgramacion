export class Tienda {
    constructor(id, tipo, nombre, descripcion, imagen) {
        this.id = id;
        this.tipo = tipo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
    }

    getId() {
        return this.id;
    }

    getTipo() {
        return this.tipo;
    }

    getNombre() {
        return this.nombre;
    }

    getDescripcion() {
        return this.descripcion;
    }

    getImagen() {
        return this.imagen;
    }
}