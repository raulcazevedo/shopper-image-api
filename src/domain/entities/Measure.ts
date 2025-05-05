export class Measure {
  constructor(
    public readonly measure_uuid: string,       
    public readonly customer_code: string,      
    public readonly measure_datetime: Date,     
    public readonly measure_type: 'WATER' | 'GAS',
    public readonly image_url: string,          
    public readonly measure_value: number,      
    public has_confirmed: boolean = false,
    public confirmed_value?: number
  ) {}
}
