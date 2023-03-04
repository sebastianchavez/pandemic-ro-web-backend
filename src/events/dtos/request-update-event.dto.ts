import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class RequestUpdateEventDto {
    @IsNotEmpty()
    @IsNumber()
    readonly idEvent: number;

    @IsNotEmpty()
    @IsString()
    readonly title: string;
    
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsString()
    readonly type: string;

    @IsNotEmpty()
    @IsNumber()
    readonly days: number; // 1234567

    @IsNotEmpty()
    @IsNumber()
    readonly startHour: number;
    
    @IsNotEmpty()
    @IsNumber()
    readonly endHour: number;
}