import { Router } from 'express';
import { AdvertisementsController } from '../controllers/AdvertisementControllers';
export const advertisementsRouter = Router();
advertisementsRouter.get('/', AdvertisementsController.index);
advertisementsRouter.post('/', AdvertisementsController.create);
