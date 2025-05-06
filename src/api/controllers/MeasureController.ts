import { Request, Response } from 'express';
import { CreateMeasureUseCase } from 'application/use-cases/CreateMeasureUseCase';
import { PrismaMeasureRepository } from 'infrastructure/persistence/MeasureRepository';
import { GeminiService } from 'infrastructure/services/GeminiService';

export class MeasureController {
  static async create(req: Request, res: Response): Promise<void> {
    const { type } = req.body;
    const image = req.file;
    const customerCode = req.params.customerCode;

    if (!image) {
      res.status(400).json({ error: 'Image is required' });
      return;
    }

    try {
      const imageUrl = `uploads/${image.filename}`;
      const measureRepository = new PrismaMeasureRepository();
      const geminiService = new GeminiService();
      const useCase = new CreateMeasureUseCase(measureRepository, geminiService);

      const measure = await useCase.execute({
        type,
        image,
        customerCode,
        datetime: new Date(),
        imageUrl
      });

      res.status(201).json(measure);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
