import { Request, Response } from 'express';
import { UploadMeasureUseCase } from '../../../application/use-cases/UploadMeasureUseCase';
import { MeasureType } from '../../../domain/enums/MeasureType';

export class UploadMeasureController {
  constructor(private readonly uploadMeasureUseCase: UploadMeasureUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { type, customerCode, datetime } = req.body;

      if (!req.file) {
        res.status(400).json({ error: 'Image file is required' });
        return;
      }

      const imageBuffer = req.file.buffer;

      const measure = await this.uploadMeasureUseCase.execute({
        type: type as MeasureType,
        customerCode,
        datetime: new Date(datetime),
        imageBuffer,
      });

      res.status(201).json(measure);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
