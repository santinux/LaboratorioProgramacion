import { readJSON } from '../utils/read-JSON.js';

const productos = readJSON('../data/productos.json');

export class ProductosRepository {
    static async getAll({ tipo }) {
        let ret = productos;
        if (tipo)
            ret =  (productos.filter((producto) => producto.tipo === tipo));
        return (ret);
    }

    static async getById({ id }) {
        return (productos.find((producto) => producto.id === id));
    }

    static async create({ nuevoProducto }) {
        const producto = {
            id: productos.length + 1,
            ...nuevoProducto
        };
        productos.push(producto);
        return (producto);
    }

    static async update({ id, nuevoProducto }) {
        const index = productos.findIndex((producto) => producto.id === id);
        if (index !== -1) {
            productos[index] = {
                ...productos[index],
                ...nuevoProducto
            };
        }
        return (productos[index]);
    }

    static async delete({ id }) {
        const index = productos.findIndex((producto) => producto.id === id);
        let ret = false;
        if (index !== -1) {
            productos.splice(index, 1);
            ret = true;
        }
        return (ret);
    }
}
