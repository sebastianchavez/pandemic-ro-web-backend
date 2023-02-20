import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RequestUpdateProcessLockDto {
  @IsNotEmpty()
  @IsNumber()
  readonly idProcesslock: number;

  @IsNotEmpty()
  @IsString()
  readonly typeValidation: string;

  @IsNotEmpty()
  @IsString()
  readonly value: string;

  @IsNotEmpty()
  @IsNumber()
  readonly range: number;
}
