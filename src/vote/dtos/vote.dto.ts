import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class VoteDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    ip: string;
    
    @IsNotEmpty()
    @IsNumber()
    rank: number;
}