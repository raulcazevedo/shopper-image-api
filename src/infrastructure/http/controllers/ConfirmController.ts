import { Request, Response } from 'express';
import { ConfirmMeasureUseCase } from '../../../application/use-cases/ConfirmMeasureUseCase';

export class ConfirmController {
  constructor(private readonly confirmMeasureUseCase: ConfirmMeasureUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { measure_uuid, confirmed_value } = req.body;

      // Valida os parâmetros
      if (typeof measure_uuid !== 'string' || typeof confirmed_value !== 'number') {
        res.status(400).json({
          error_code: 'INVALID_DATA',
          error_description: 'Os dados fornecidos no corpo da requisição são inválidos',
        });
        return;
      }

      // Chama o caso de uso para confirmar a medida
      await this.confirmMeasureUseCase.execute({
        measure_uuid,
        confirmed_value,
      });

      res.status(200).json({
        success: true,
      });
    } catch (error: any) {
      if (error.message === 'Measure not found') {
        res.status(404).json({
          error_code: 'MEASURE_NOT_FOUND',
          error_description: 'Leitura não encontrada',
        });
      } else if (error.message === 'Leitura já confirmada') {
        res.status(409).json({
          error_code: 'CONFIRMATION_DUPLICATE',
          error_description: 'Leitura já confirmada',
        });
      } else {
        res.status(500).json({
          error_code: 'INTERNAL_ERROR',
          error_description: 'Erro interno no servidor',
        });
      }
    }
  }
}
