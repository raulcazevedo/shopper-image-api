import { Router } from 'express';
import { ConfirmMeasureUseCase } from '../../../application/use-cases/ConfirmMeasureUseCase';
import { ConfirmController } from '../controllers/ConfirmController';
import { PrismaMeasureRepository } from '../../persistence/MeasureRepository';

import { GeminiService } from '../../services/GeminiService';
import { UploadMeasureUseCase } from '../../../application/use-cases/UploadMeasureUseCase';
import { UploadMeasureController } from '../controllers/UploadController';

import { upload } from '../middlewares/upload';

const router = Router();

// Confirmação de medida
const measureRepository = new PrismaMeasureRepository();
const confirmMeasureUseCase = new ConfirmMeasureUseCase(measureRepository);
const confirmController = new ConfirmController(confirmMeasureUseCase);

// Upload de imagem
const geminiService = new GeminiService();
const uploadMeasureUseCase = new UploadMeasureUseCase(measureRepository, geminiService);
const uploadImageController = new UploadMeasureController(uploadMeasureUseCase);

// Rota PATCH para confirmar medida
router.patch('/:uuid', async (req, res) => {
  await confirmController.handle(req, res);
});

// Rota POST para upload de imagem com middleware do multer
router.post('/measure/image', upload.single('image'), async (req, res) => {
  await uploadImageController.handle(req, res);
});

export default router;
