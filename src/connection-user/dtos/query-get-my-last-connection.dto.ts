import { IsEmail, IsNotEmpty } from "class-validator";

export class QueryGetMyLastConnectionDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;    
}