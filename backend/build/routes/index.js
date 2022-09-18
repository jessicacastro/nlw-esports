import { Router } from 'express';
import { advertisementsRouter } from './advertisements.routes';
import { gamesRouter } from './games.routes';
const router = Router();
router.get('/', (request, response) => response.json({ message: 'API Works!' }));
router.use('/games', gamesRouter);
router.use('/ads', advertisementsRouter);
export default router;
