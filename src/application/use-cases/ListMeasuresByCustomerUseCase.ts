import { MeasureRepository } from '../../domain/repositories/MeasureRepository';
import { Measure } from '../../domain/entities/Measure';

interface ListMeasuresByCustomerDTO {
  customer_code: string;
  measure_type?: string;
}

export class ListMeasuresByCustomerUseCase {
  constructor(private readonly measureRepository: MeasureRepository) {}

  async execute({ customer_code, measure_type }: ListMeasuresByCustomerDTO): Promise<Measure[]> {
    let normalizedType: 'WATER' | 'GAS' | undefined;

    if (measure_type) {
      const upperType = measure_type.toUpperCase();
      if (upperType !== 'WATER' && upperType !== 'GAS') {
        throw new Error('INVALID_TYPE');
      }
      normalizedType = upperType as 'WATER' | 'GAS';
    }

    const measures = await this.measureRepository.findByCustomerCode(customer_code, normalizedType);

    if (!measures.length) {
      throw new Error('MEASURES_NOT_FOUND');
    }

    return measures;
  }
}
