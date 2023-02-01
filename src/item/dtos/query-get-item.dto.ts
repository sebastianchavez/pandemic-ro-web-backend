import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class QueryGetItemDto {
    
    @IsOptional()
    @IsString()
    readonly name: string;
    
    @IsNotEmpty()
    @IsNumber()
    readonly page: number;
    
    @IsNotEmpty()
    @IsNumber()
    readonly limit: number;
}