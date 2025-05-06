export class Measure {
  public readonly measure_uuid: string;
  public readonly customer_code: string;
  public readonly measure_datetime: Date;
  public readonly measure_type: 'WATER' | 'GAS';
  public readonly image_url: string;
  public readonly measure_value: number;
  public has_confirmed: boolean;
  public confirmed_value: number | null;

  constructor(props: {
    measure_uuid: string;
    customer_code: string;
    measure_datetime: Date;
    measure_type: 'WATER' | 'GAS';
    image_url: string;
    measure_value: number;
    has_confirmed?: boolean;
    confirmed_value: number | null;
  }) {
    this.measure_uuid = props.measure_uuid;
    this.customer_code = props.customer_code;
    this.measure_datetime = props.measure_datetime;
    this.measure_type = props.measure_type;
    this.image_url = props.image_url;
    this.measure_value = props.measure_value;
    this.has_confirmed = props.has_confirmed ?? false;
    this.confirmed_value = props.confirmed_value;
  }
}
