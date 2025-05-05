import { GeminiService } from '../../infrastructure/services/GeminiService';
import { MeasureRepository } from '../../domain/repositories/MeasureRepository';
import { Measure } from '../../domain/entities/Measure';
import { MeasureType } from '../../domain/enums/MeasureType';
import { randomUUID } from 'crypto';

interface CreateMeasureDTO {
  type: MeasureType;
  image: Express.Multer.File;
  customerCode: string;
  datetime: Date;
}

export class CreateMeasureUseCase {
  constructor(
    private readonly measureRepository: MeasureRepository,
    private readonly geminiService: GeminiService
  ) {}

  async execute({ type, image, customerCode, datetime }: CreateMeasureDTO): Promise<Measure> {
    if (!Object.values(MeasureType).includes(type)) {
      throw new Error('Invalid measure type');
    }

    const imageBase64 = image.buffer.toString('base64');

    // Obter o valor da medida a partir da imagem
    const predictedValue = await this.geminiService.getMeasureFromImage(imageBase64);

    const measure = new Measure(
      randomUUID(),
      customerCode,
      datetime,
      type,
      'image_saved_somewhere.jpg', // substitua com caminho real
      predictedValue,
      false
    );

    await this.measureRepository.save(measure);

    return measure;
  }
}
