import { IsNotEmpty, IsNumber } from "class-validator";

export class QueryGetEventsPageDto {
    @IsNumber()
    @IsNotEmpty()
    readonly day: number;
    
    @IsNumber()
    @IsNotEmpty()
    readonly hour: number;
}
