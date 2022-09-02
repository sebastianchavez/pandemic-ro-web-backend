import { IsEmail, IsNotEmpty, IsString, min, MinLength } from "class-validator";

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;
}