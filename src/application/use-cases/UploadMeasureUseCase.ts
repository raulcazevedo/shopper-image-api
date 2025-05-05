import { MeasureRepository } from '../../domain/repositories/MeasureRepository';
import { GeminiService } from '../../infrastructure/services/GeminiService';
import { Measure } from '../../domain/entities/Measure';
import { MeasureDTO } from '../dto/MeasureDTO';
import { MeasureType } from '../../domain/enums/MeasureType';
import { randomUUID } from 'crypto';

interface UploadImageDTO {
  type: MeasureType;
  imageBuffer: Buffer;
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

    // Convertendo o Buffer da imagem para uma string base64
    const imageBase64 = dto.imageBuffer.toString('base64');

    // Passando a imagem em base64 para o serviço
    const predictedValue = await this.geminiService.getMeasureFromImage(imageBase64);
    const measure = new Measure(
      randomUUID(),
      dto.customerCode,
      dto.datetime,
      dto.type,
      'image_saved_somewhere.jpg', // ou use um caminho real após salvar a imagem
      predictedValue,
      false
    );

    await this.measureRepository.save(measure);
    return measure;
  }
}

