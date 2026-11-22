import { Router } from 'express';
import { ProductosController } from '../controllers/productos-controller.js';

export const productosRouter = new Router();

productosRouter.get('/', ProductosController.getAll);
productosRouter.post('/', ProductosController.create);

productosRouter.get('/:id', ProductosController.getById);
productosRouter.put('/:id', ProductosController.update);
productosRouter.patch('/:id', ProductosController.update);
productosRouter.delete('/:id', ProductosController.delete);
