import { Router } from 'express';
import { GamesController } from '../controllers/GamesController';
export const gamesRouter = Router();
gamesRouter.get('/', GamesController.index);
gamesRouter.post('/', GamesController.create);
