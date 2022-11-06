import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RegisterAdminDto{

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsNumber()
    @IsNotEmpty()
    readonly idAdminRole: number;
}