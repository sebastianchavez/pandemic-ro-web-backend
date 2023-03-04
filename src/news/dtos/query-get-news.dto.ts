import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class QueryGetNewsDto {
    @IsNotEmpty()
    @IsNumber()
    readonly limit: number;

    @IsNotEmpty()
    @IsNumber()
    readonly page: number;

    @IsOptional()
    @IsBoolean()
    readonly inWeb?: boolean;

    @IsOptional()
    @IsBoolean()
    readonly inClient?: boolean;
    
    @IsOptional()
    @IsBoolean()
    readonly inSlide?: boolean;
    
    @IsOptional()
    @IsString()
    readonly title?: string;

    @IsOptional()
    @IsDate()
    readonly startDate?: Date;

    @IsOptional()
    @IsDate()
    readonly endDate?: Date;
}