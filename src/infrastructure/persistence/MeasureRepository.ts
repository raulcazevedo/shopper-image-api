import { prisma } from './database';
import { Measure } from '../../domain/entities/Measure';
import { MeasureRepository } from '../../domain/repositories/MeasureRepository';
import { PrismaMeasureMapper } from '../mappers/PrismaMeasureMapper';

export class PrismaMeasureRepository implements MeasureRepository {

  async create(measure: Measure): Promise<void> {
    await prisma.measure.create({
      data: {
        measure_uuid: measure.measure_uuid,
        customer_code: measure.customer_code,
        measure_datetime: measure.measure_datetime,
        measure_type: measure.measure_type,
        image_url: measure.image_url,
        measure_value: measure.measure_value,
        has_confirmed: measure.has_confirmed,
      },
    });
  }

  // Método para salvar a medida
  async save(measure: Measure): Promise<void> {
    await prisma.measure.create({
      data: {
        measure_uuid: measure.measure_uuid,
        customer_code: measure.customer_code,
        measure_datetime: measure.measure_datetime,
        measure_type: measure.measure_type,
        image_url: measure.image_url,
        measure_value: measure.measure_value,
        has_confirmed: measure.has_confirmed,
      },
    });
  }

  async findByMonth(customerCode: string, type: string, month: number, year: number): Promise<Measure | null> {
    throw new Error('Method not implemented.');
  }
  
  async confirmValue(uuid: string, value: number): Promise<void> {
    throw new Error('Method not implemented.');
  }

  // Método findByUUID para buscar uma medida pelo UUID
  async findByUUID(uuid: string): Promise<Measure | null> {
    return prisma.measure.findUnique({
      where: {
        measure_uuid: uuid, // Usando measure_uuid como chave para buscar a medida
      },
    });
  }

  async findById(uuid: string): Promise<Measure | null> {
    throw new Error('Method not implemented.');
  }

  async listByCustomer(customerCode: string, type?: string): Promise<Measure[]> {
    throw new Error('Method not implemented.');
  }

  async update(measure: Measure): Promise<void> {
    await prisma.measure.update({
      where: { measure_uuid: measure.measure_uuid },
      data: {
        customer_code: measure.customer_code,
        measure_datetime: measure.measure_datetime,
        measure_type: measure.measure_type,
        image_url: measure.image_url,
        measure_value: measure.measure_value,
        has_confirmed: measure.has_confirmed,
      },
    });
  }

  async findAll(): Promise<Measure[]> {
    return prisma.measure.findMany();
  }

  async findByCustomerAndDatetime(customerCode: string, measureDatetime: Date): Promise<Measure | null> {
    return prisma.measure.findFirst({
      where: {
        customer_code: customerCode,
        measure_datetime: measureDatetime,
      },
    });
  }
  async findByCustomerCode(customer_code: string, measure_type?: string): Promise<Measure[]> {
    const whereClause: any = {
      customer_code,
    };

    if (measure_type) {
      const normalizedType = measure_type.toUpperCase();
      if (normalizedType !== 'WATER' && normalizedType !== 'GAS') {
        throw new Error('INVALID_TYPE');
      }
      whereClause.measure_type = normalizedType;
    }

    const result = await prisma.measure.findMany({
      where: whereClause,
      orderBy: { measure_datetime: 'desc' },
    });

    if (!result || result.length === 0) {
      throw new Error('MEASURES_NOT_FOUND');
    }

    return result.map(PrismaMeasureMapper.toDomain);
  }
}
