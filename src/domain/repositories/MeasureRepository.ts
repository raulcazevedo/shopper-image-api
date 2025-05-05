import { Measure } from '../entities/Measure';

export interface MeasureRepository {
  findByUUID(uuid: string): Promise<Measure | null>;  // Adicionando o método findByUUID
  save(measure: Measure): Promise<void>;
  create(measure: Measure): Promise<void>;
  update(measure: Measure): Promise<void>;
  findAll(): Promise<Measure[]>;
  findByCustomerAndDatetime(customerCode: string, measureDatetime: Date): Promise<Measure | null>;
  listByCustomer(customerCode: string, type?: string): Promise<Measure[]>;
  findByMonth(customerCode: string, type: string, month: number, year: number): Promise<Measure | null>;
  findByCustomerCode(customer_code: string, measure_type?: 'WATER' | 'GAS'): Promise<Measure[]>;
}
