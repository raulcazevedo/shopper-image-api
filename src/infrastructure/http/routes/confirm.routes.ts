import { Router } from 'express';
import { ConfirmController } from '../controllers/ConfirmController';
import { ConfirmMeasureUseCase } from 'application/use-cases/ConfirmMeasureUseCase';
import { PrismaMeasureRepository } from 'infrastructure/persistence/MeasureRepository'; // Caminho correto para PrismaMeasureRepository

const router = Router();

// Criação da instância do repositório
const measureRepository = new PrismaMeasureRepository();

// Criação da instância do use case
const confirmMeasureUseCase = new ConfirmMeasureUseCase(measureRepository);

// Criação da instância do controller com o use case
const confirmController = new ConfirmController(confirmMeasureUseCase);

router.post('/', (req, res) => {
  confirmController.handle(req, res);
});

export default router;
