import { Router } from 'express';
import multer from 'multer';
import { UploadController } from '../controllers/UploadController';
import { UploadMeasureUseCase } from 'application/use-cases/UploadMeasureUseCase';
import { PrismaMeasureRepository } from 'infrastructure/persistence/PrismaMeasureRepository';
import { GeminiService } from 'infrastructure/services/GeminiService';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Criação da instância do repositório
const measureRepository = new PrismaMeasureRepository();

// Criação da instância do GeminiService
const geminiService = new GeminiService();

// Criação da instância do use case com ambos os parâmetros
const uploadMeasureUseCase = new UploadMeasureUseCase(measureRepository, geminiService);

// Criação da instância do controller com o use case
const uploadController = new UploadController(uploadMeasureUseCase);

router.post('/', upload.single('image'), (req, res) => {
  uploadController.handle(req, res);
});

export default router;
