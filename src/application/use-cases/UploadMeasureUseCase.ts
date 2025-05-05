import { MeasureRepository } from '../../domain/repositories/MeasureRepository';
import { GeminiService } from '../../infrastructure/services/GeminiService';
import { Measure } from '../../domain/entities/Measure';
import { MeasureDTO } from '../dto/MeasureDTO';
import { randomUUID } from 'crypto';

export class UploadMeasureUseCase {
  constructor(
    private readonly measureRepository: MeasureRepository,
    private readonly geminiService: GeminiService
  ) {}

  async execute(dto: MeasureDTO): Promise<Measure> {
    const exists = await this.measureRepository.findByCustomerAndDatetime(
      dto.customerCode,
      dto.measureDatetime
    );
    if (exists) {
      throw new Error('Measure already exists for this customer and datetime');
    }

    const predictedValue = await this.geminiService.getMeasureFromImage(dto.imageUrl);

    const measure = new Measure(
      randomUUID(),
      dto.customerCode,
      dto.measureDatetime,
      dto.measureType,
      dto.imageUrl,
      predictedValue,
      false
    );

    await this.measureRepository.save(measure);
    return measure;
  }
}
