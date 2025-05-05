import { Measure } from '../entities/Measure';

export interface MeasureRepository {
  findByMonth(customerCode: string, type: string, month: number, year: number): Promise<Measure | null>;
  save(measure: Measure): Promise<void>;
  confirmValue(uuid: string, value: number): Promise<void>;
  findById(uuid: string): Promise<Measure | null>;
  listByCustomer(customerCode: string, type?: string): Promise<Measure[]>;
  update(measure: Measure): Promise<void>;
  findAll(): Promise<Measure[]>;
  findByCustomerAndDatetime(customerCode: string, measureDatetime: Date): Promise<Measure | null>;

}
