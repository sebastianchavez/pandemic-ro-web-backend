import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class QueryProcessLockDto {
  @IsOptional()
  @IsString()
  readonly typeValidation: string;

  @IsOptional()
  @IsString()
  readonly value: string;

  @IsOptional()
  @IsNumber()
  readonly limit: number;

  @IsNotEmpty()
  @IsNumber()
  readonly page: number;
}
