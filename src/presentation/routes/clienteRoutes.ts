// src/presentation/routes/clienteRoutes.ts
import { Router } from 'express';
import { ClienteController } from '../controllers/ClienteController';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();
const controller = new ClienteController();

router.post('/',   asyncHandler(controller.create.bind(controller)));
router.put('/:id', asyncHandler(controller.update.bind(controller)));
router.get('/:id', asyncHandler(controller.findById.bind(controller)));
router.get('/',    asyncHandler(controller.findAll.bind(controller)));

export { router as clienteRoutes };
