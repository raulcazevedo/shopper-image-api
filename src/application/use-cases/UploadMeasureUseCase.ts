import { MeasureRepository } from '../../domain/repositories/MeasureRepository';
import { GeminiService } from '../../infrastructure/services/GeminiService';
import { Measure } from '../../domain/entities/Measure';
import { MeasureType } from '../../domain/enums/MeasureType';
import { randomUUID } from 'crypto';

interface UploadImageDTO {
  type: MeasureType;
  imageBuffer: Buffer;
  imageName: String;
  customerCode: string;
  datetime: Date;
}

export class UploadMeasureUseCase {
  constructor(
    private readonly measureRepository: MeasureRepository,
    private readonly geminiService: GeminiService
  ) {}

  async execute(dto: UploadImageDTO): Promise<Measure> {
    const exists = await this.measureRepository.findByCustomerAndDatetime(
      dto.customerCode,
      dto.datetime
    );
    if (exists) {
      throw new Error('Measure already exists for this customer and datetime');
    }

    const imageUrl = `uploads/${dto.imageName}`;

    const imageBase64 = dto.imageBuffer.toString('base64');
    const predictedValue = await this.geminiService.getMeasureFromImage(imageBase64);
    
    const measure = new Measure({
      measure_uuid: randomUUID(),
      customer_code: dto.customerCode,
      measure_datetime: dto.datetime,
      measure_type: dto.type,
      image_url: imageUrl,
      measure_value: predictedValue,
      has_confirmed: false,
      confirmed_value: null,
    });

    await this.measureRepository.save(measure);
    return measure;
  }
}

