import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RequestSaveProcessLockDto {
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
