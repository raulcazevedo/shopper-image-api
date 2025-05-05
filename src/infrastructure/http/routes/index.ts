import { Router } from 'express';
import { ConfirmMeasureUseCase } from '../../../application/use-cases/ConfirmMeasureUseCase';
import { ConfirmController } from '../controllers/ConfirmController';
import { PrismaMeasureRepository } from '../../persistence/PrismaMeasureRepository';

const router = Router();

const measureRepository = new PrismaMeasureRepository();
const confirmMeasureUseCase = new ConfirmMeasureUseCase(measureRepository);
const confirmController = new ConfirmController(confirmMeasureUseCase);

router.patch('/:uuid', async (req, res) => {
    const { uuid } = req.params; // Obtendo o parâmetro 'uuid'
    await confirmController.handle(req, res);
  });
export default router;
