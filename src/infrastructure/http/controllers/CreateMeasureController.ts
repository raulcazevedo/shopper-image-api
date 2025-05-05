import { Request, Response } from 'express';
import { CreateMeasureUseCase } from '../../../application/use-cases/CreateMeasureUseCase';
import { PrismaMeasureRepository } from '../../persistence/MeasureRepository';
import { GeminiService } from '../../services/GeminiService';

export class CreateMeasureController {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { type, customerCode, datetime } = req.body;

      if (!req.file) {
        res.status(400).json({ error: 'Image file is required' });
        return;
      }

      const useCase = new CreateMeasureUseCase(
        new PrismaMeasureRepository(),
        new GeminiService()
      );

      const measure = await useCase.execute({
        type,
        image: req.file,
        customerCode,
        datetime: new Date(datetime),
      });

      res.status(201).json(measure);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
