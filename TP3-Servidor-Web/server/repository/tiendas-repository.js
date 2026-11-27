import { readJSON } from '../utils/read-JSON.js';

const tiendas = readJSON('../data/tiendas.json');

export class TiendasRepository {
    static async getAll({ tipo }) {
        let ret = tiendas;
        if (tipo)
            ret = (tiendas.filter(tienda => tienda.tipo === tipo));
        return (ret);
    }

    static async getById({ id }) {
        return (tiendas.find((tienda) => tienda.id === id));
    }

    static async create({ nuevaTienda }) {
        const tienda = {
            id: tiendas.length + 1,
            ...nuevaTienda
        };
        tiendas.push(tienda);
        return (tienda);
    }

    static async update({ id, nuevaTienda }) {
        const index = tiendas.findIndex((tienda) => tienda.id === id);
        if (index !== -1) {
            tiendas[index] = {
                ...tiendas[index],
                ...nuevaTienda
            };
        }
        return (tiendas[index]);
    }

    static async delete({ id }) {
        const index = tiendas.findIndex((tienda) => tienda.id === id);
        let ret = false;
        if (index !== -1) {
            tiendas.splice(index, 1);
            ret = true;
        }
        return (ret);
    }
}
