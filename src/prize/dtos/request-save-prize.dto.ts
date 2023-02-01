import { IsNotEmpty, IsNumber } from "class-validator";

export class RequestSavePrizeDto {
    @IsNotEmpty()
    @IsNumber()
    readonly day: number;
    
    @IsNotEmpty()
    @IsNumber()
    readonly itemId: number;
    
    @IsNotEmpty()
    @IsNumber()
    readonly quantity: number;
}