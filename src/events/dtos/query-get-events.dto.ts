import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class QueryGetEventsDto {
    @IsNotEmpty()
    @IsNumber()
    readonly limit: number;

    @IsNotEmpty()
    @IsNumber()
    readonly page: number;

    @IsOptional()
    @IsString()
    readonly title?: string;

    @IsOptional()
    @IsString()
    readonly type?: string
}