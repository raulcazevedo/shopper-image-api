import { Request, Response } from 'express';
import { ConfirmMeasureUseCase } from '../../../application/use-cases/ConfirmMeasureUseCase';

export class ConfirmController {
  constructor(private readonly confirmMeasureUseCase: ConfirmMeasureUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { uuid } = req.params;

      if (!uuid) {
        return res.status(400).json({ error: 'UUID is required' });
      }

      await this.confirmMeasureUseCase.execute(uuid);

      return res.status(200).json({ message: 'Measure confirmed successfully' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  }
}
