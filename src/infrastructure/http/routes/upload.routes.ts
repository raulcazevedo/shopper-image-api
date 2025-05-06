
import { Router } from 'express';
import multer from 'multer';
import { MeasureController } from '../../../api/controllers/MeasureController';
import { UploadController } from '../controllers/UploadController';
import { UploadMeasureUseCase } from 'application/use-cases/UploadMeasureUseCase';
import { PrismaMeasureRepository } from 'infrastructure/persistence/MeasureRepository';
import { GeminiService } from 'infrastructure/services/GeminiService';
import { CreateMeasureController } from '../controllers/CreateMeasureController';
import { ConfirmMeasureUseCase } from '../../../application/use-cases/ConfirmMeasureUseCase';
import { ConfirmController } from '../controllers/ConfirmController';
import { ListMeasuresByCustomerUseCase } from '../../../application/use-cases/ListMeasuresByCustomerUseCase';
import { ListMeasuresByCustomerController } from '../controllers/ListMeasuresByCustomerController';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

const createMeasureController = new CreateMeasureController();

// Criação da instância do repositório
const measureRepository = new PrismaMeasureRepository();

// Criação da instância do GeminiService
const geminiService = new GeminiService();

// Criação da instância do use case com ambos os parâmetros
const uploadMeasureUseCase = new UploadMeasureUseCase(measureRepository, geminiService);

// Criação da instância do controller com o use case
const uploadController = new UploadController(uploadMeasureUseCase);

// Instanciando o ConfirmMeasureUseCase e o ConfirmMeasureController
const confirmMeasureUseCase = new ConfirmMeasureUseCase(measureRepository);
const confirmMeasureController = new ConfirmController(confirmMeasureUseCase);

const listMeasuresByCustomerUseCase = new ListMeasuresByCustomerUseCase(measureRepository);
const listMeasuresByCustomerController = new ListMeasuresByCustomerController(listMeasuresByCustomerUseCase);

// Definindo as rotas

router.post('/:customerCode/create', upload.single('image'), MeasureController.create);

router.post('/measures', upload.single('image'), (req, res) => {
  CreateMeasureController.create(req, res);
});

router.post('/', upload.single('image'), (req, res) => {
  uploadController.upload(req, res);
});

// Nova rota PATCH /confirm
router.patch('/confirm', (req, res) => {
  confirmMeasureController.handle(req, res);
});

// Rota para listar as medidas de um cliente específico
router.get('/:customer_code/list', (req, res) => {
  listMeasuresByCustomerController.handle(req, res);
});

export default router;
