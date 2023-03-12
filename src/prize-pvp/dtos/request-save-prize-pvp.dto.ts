import { IsNotEmpty, IsNumber } from "class-validator";

export  class RequestSavePrizePvpDto {
    @IsNotEmpty()
    @IsNumber()
    readonly item_id: number;
    
    @IsNotEmpty()
    @IsNumber()
    readonly quantity: number;
    
    @IsNotEmpty()
    @IsNumber()
    readonly morethan: number;
    
    @IsNotEmpty()
    @IsNumber()
    readonly lessthan: number;
}