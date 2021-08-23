import { IsString } from 'class-validator';

export class InputParkingSlotDto {
  @IsString()
  car_number: string;
}
