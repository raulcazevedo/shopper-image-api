import { Request, Response } from 'express';
import { UploadMeasureUseCase } from '../../../application/use-cases/UploadMeasureUseCase';

export class UploadController {
  constructor(private useCase: UploadMeasureUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const result = await this.useCase.execute(req.body);
      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(err.status || 500).json({
        error_code: err.code || 'UNKNOWN',
        error_description: err.message,
      });
    }
  }
}
