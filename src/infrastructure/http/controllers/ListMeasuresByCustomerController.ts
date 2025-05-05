import { Request, Response } from 'express';
import { ListMeasuresByCustomerUseCase } from '../../../application/use-cases/ListMeasuresByCustomerUseCase';

export class ListMeasuresByCustomerController {
  constructor(private readonly listMeasuresByCustomerUseCase: ListMeasuresByCustomerUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    const customer_code = req.params.customer_code;
    const measure_type = req.query.measure_type as string | undefined;

    try {
      const measures = await this.listMeasuresByCustomerUseCase.execute({
        customer_code,
        measure_type,
      });

      const response = {
        customer_code,
        measures: measures.map((measure) => ({
          measure_uuid: measure.measure_uuid,
          measure_datetime: measure.measure_datetime,
          measure_type: measure.measure_type,
          has_confirmed: measure.has_confirmed,
          image_url: measure.image_url,
        })),
      };

      res.status(200).json(response);
    } catch (error: any) {
      if (error.message === 'INVALID_TYPE') {
        res.status(400).json({
          error_code: 'INVALID_TYPE',
          error_description: 'Tipo de medição não permitida',
        });
      } else if (error.message === 'MEASURES_NOT_FOUND') {
        res.status(404).json({
          error_code: 'MEASURES_NOT_FOUND',
          error_description: 'Nenhuma leitura encontrada',
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
