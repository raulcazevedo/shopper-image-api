import { Measure } from '../../domain/entities/Measure';

export class PrismaMeasureMapper {
  static toDomain(raw: any): Measure {
    return {
      measure_uuid: raw.measure_uuid,
      customer_code: raw.customer_code,
      measure_datetime: raw.measure_datetime,
      measure_type: raw.measure_type,
      image_url: raw.image_url,
      measure_value: raw.measure_value,
      has_confirmed: raw.has_confirmed,
    };
  }
}
