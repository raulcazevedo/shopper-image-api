import { Request, Response } from 'express';
import { PrismaMeasureRepository } from '../../persistence/MeasureRepository';

export class ListMeasuresController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { customer_code } = req.params;
    const measureType = req.query.measure_type as 'WATER' | 'GAS' | undefined;

    const measureRepository = new PrismaMeasureRepository();

    try {
      const measures = await measureRepository.listByCustomer(
        customer_code,
        measureType
      );

      return res.json({
        customer_code,
        measures,
      });
    } catch (error) {
      return res.status(500).json({
        error_code: 'INTERNAL_ERROR',
        error_description: 'Something went wrong while fetching the measures',
      });
    }
    return res.json({ message: 'List of measures' });
  }
}
