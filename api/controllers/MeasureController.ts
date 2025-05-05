// src/api/controllers/MeasureController.ts
import { Request, Response } from 'express';
import { CreateMeasureUseCase } from '../../application/usecases/CreateMeasureUseCase';

export class MeasureController {
  static async create(req: Request, res: Response): Promise<Response> {
    const { type } = req.body;
    const { image } = req.file;

    try {
      const measure = await CreateMeasureUseCase.execute({ type, image });
      return res.status(201).json(measure);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
