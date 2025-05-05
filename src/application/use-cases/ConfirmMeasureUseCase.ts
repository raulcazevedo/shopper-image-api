// No ConfirmMeasureUseCase.ts
import { MeasureRepository } from '../../domain/repositories/MeasureRepository';
import { Measure } from '../../domain/entities/Measure';

interface ConfirmMeasureDTO {
  measure_uuid: string;
  confirmed_value: number;
}

export class ConfirmMeasureUseCase {
  constructor(private readonly measureRepository: MeasureRepository) {}

  async execute({ measure_uuid, confirmed_value }: ConfirmMeasureDTO): Promise<void> {
    // Verifica se a leitura existe
    const measure = await this.measureRepository.findByUUID(measure_uuid);
    if (!measure) {
      throw {
        code: 'MEASURE_NOT_FOUND',
        message: 'Leitura não encontrada',
      };
    }

    // Verifica se a leitura já foi confirmada
    if (measure.has_confirmed) { 
      throw {
        code: 'CONFIRMATION_DUPLICATE',
        message: 'Leitura já confirmada',
      };
    }

    // Atualiza a leitura com o valor confirmado
    measure.confirmed_value = confirmed_value;  
    measure.has_confirmed = true;  

    await this.measureRepository.save(measure);
  }
}