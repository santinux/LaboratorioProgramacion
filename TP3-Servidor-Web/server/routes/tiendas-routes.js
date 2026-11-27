import { Router } from 'express';
import { TiendasController } from '../controllers/tiendas-controller.js';

export const tiendasRouter = new Router();

tiendasRouter.get('/', TiendasController.getAll);
tiendasRouter.post('/', TiendasController.create);

tiendasRouter.get('/:id', TiendasController.getById);
tiendasRouter.put('/:id', TiendasController.update);
tiendasRouter.patch('/:id', TiendasController.update);
tiendasRouter.delete('/:id', TiendasController.delete);
