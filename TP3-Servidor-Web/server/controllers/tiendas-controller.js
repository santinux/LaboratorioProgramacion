import { TiendasRepository } from '../repository/tiendas-repository.js';

export class TiendasController {
    static async getAll(req, res) {
        const { tipo } = req.query;
        const tiendas = await TiendasRepository.getAll({ tipo });
        res.json(tiendas);
    }

    static async getById(req, res) {
        const { id } = req.params;
        const tienda = await TiendasRepository.getById({ id });
        res.json(tienda);
    }

    static async create(req, res) {
        const nuevaTienda = req.body;
        const tiendaCreada = await TiendasRepository.create({ nuevaTienda });
        res.json(tiendaCreada);
    }

    static async update(req, res) {
        const { id } = req.params;
        const { nuevaTienda } = req.body;
        const tiendaActualizada = await TiendasRepository.update({ id, nuevaTienda });
        res.json(tiendaActualizada);
    }

    static async delete(req, res) {
        const { id } = req.params;
        const tiendaEliminada = await TiendasRepository.delete({ id });
        res.json(tiendaEliminada);
    }
}
