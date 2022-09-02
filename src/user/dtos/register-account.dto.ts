import { IsNotEmpty, IsString } from "class-validator";

export class RegisterAccountDto {
    @IsString()
    @IsNotEmpty()
    readonly userid: string;

    @IsString()
    @IsNotEmpty()
    readonly user_pass: string;

    @IsString()
    @IsNotEmpty()
    readonly sex: string;

    @IsString()
    @IsNotEmpty()
    readonly last_ip: string;

}