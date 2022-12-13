import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class UpdateClientDto {
  @IsNotEmpty()
  @IsNumber()
  readonly idRoClient: number;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly forceUpdate: boolean;
}
