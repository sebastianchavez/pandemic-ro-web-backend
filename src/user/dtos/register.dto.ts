import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly user: string;

  @IsString()
  @IsNotEmpty()
  readonly genre: string;

  @IsString()
  @IsNotEmpty()
  readonly ip: string;
}
