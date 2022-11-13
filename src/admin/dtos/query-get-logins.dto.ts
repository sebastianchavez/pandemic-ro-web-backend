import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class QueryGetLoginsDto {
    @IsNumber()
    @IsNotEmpty()
    readonly page: number;
    
    @IsNumber()
    @IsNotEmpty()
    readonly limit: number;

    @IsString()
    @IsOptional()
    readonly name?: string;

    @IsEmail()
    @IsOptional()
    readonly email?: string;

    @IsString()
    @IsOptional()
    readonly ip?: string;
}