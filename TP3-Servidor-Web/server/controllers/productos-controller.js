import { ProductosRepository } from '../repository/productos-repository.js';

export class ProductosController {
    static async getAll(req, res) {
        const { tipo } = req.query;
        const productos = await ProductosRepository.getAll({ tipo });
        res.json(productos);
    }

    static async getById(req, res) {
        const { id } = req.params;
        const producto = await ProductosRepository.getById({ id });
        res.json(producto);
    }

    static async create(req, res) {
        const nuevoProducto = req.body;
        const productoCreado = await ProductosRepository.create({ nuevoProducto });
        res.json(productoCreado);
    }

    static async update(req, res) {
        const { id } = req.params;
        const { nuevoProducto } = req.body;
        const productoActualizado = await ProductosRepository.update({ id, nuevoProducto });
        res.json(productoActualizado);
    }

    static async delete(req, res) {
        const { id } = req.params;
        const productoEliminado = await ProductosRepository.delete({ id });
        res.json(productoEliminado);
    }
}
