import { prisma } from './database';
import { Measure } from '../../domain/entities/Measure';
import { MeasureRepository } from '../../domain/repositories/MeasureRepository';

export class PrismaMeasureRepository implements MeasureRepository {
  async findByMonth(customerCode: string, type: string, month: number, year: number): Promise<Measure | null> {
    throw new Error('Method not implemented.');
  }

  async save(measure: Measure): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async confirmValue(uuid: string, value: number): Promise<void> { 
    throw new Error('Method not implemented.');
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
}
