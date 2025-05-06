import { Router } from 'express';
import { ListMeasuresController } from '../controllers/ListController';

const router = Router();

router.get('/', (req, res) => {
  ListMeasuresController.handle(req, res);
});

export default router;
