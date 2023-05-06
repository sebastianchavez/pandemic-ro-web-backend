import { IsNotEmpty } from "class-validator";

export class VerificateDto {
  @IsNotEmpty()
  readonly code: string;
}