import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class InputParkingSlotDto {
  @IsString()
  @Expose()
  car_number: string;
}
