import { IsEnum, IsNotEmpty } from 'class-validator';
import { MeasureType } from '../../domain/enums/MeasureType';

export class MeasureValidator {
  @IsEnum(MeasureType)
  @IsNotEmpty()
  type!: MeasureType;

  @IsNotEmpty()
  image!: string;
}
