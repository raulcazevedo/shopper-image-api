export interface UploadMeasureInput {
    image: string;
    customer_code: string;
    measure_datetime: string;
    measure_type: 'WATER' | 'GAS';
  }
  
  export interface UploadMeasureOutput {
    image_url: string;
    measure_value: number;
    measure_uuid: string;
  }
  
  export interface MeasureDTO {
    customerCode: string;
    measureDatetime: Date;
    measureType: 'WATER' | 'GAS';
    imageUrl: string;
  }
  