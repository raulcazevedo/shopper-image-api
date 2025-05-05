import { MeasureRepository } from '../../domain/repositories/MeasureRepository';
import { Measure } from '../../domain/entities/Measure';

export class ListMeasuresUseCase {
  constructor(private readonly measureRepository: MeasureRepository) {}

  async execute(): Promise<Measure[]> {
    return await this.measureRepository.findAll();
  }
}
