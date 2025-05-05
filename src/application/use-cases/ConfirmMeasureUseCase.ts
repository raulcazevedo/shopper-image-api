import { MeasureRepository } from '../../domain/repositories/MeasureRepository';

export class ConfirmMeasureUseCase {
  constructor(private readonly measureRepository: MeasureRepository) {}

  async execute(uuid: string): Promise<void> {
    const measure = await this.measureRepository.findById(uuid);
    if (!measure) {
      throw new Error('Measure not found');
    }

    measure.has_confirmed = true;
    await this.measureRepository.update(measure);
  }
}

