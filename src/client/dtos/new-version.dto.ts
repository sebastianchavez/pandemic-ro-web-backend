import {
  IsString,
  IsNotEmpty,
  IsBase64,
  IsArray,
  IsOptional,
} from 'class-validator';

export class NewVersionDto {
  @IsString()
  @IsNotEmpty()
  readonly version: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly files: any;

  @IsOptional()
  readonly updates: any;
}
