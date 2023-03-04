import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class RequestUpdateNewsDto {
    @IsNotEmpty()
    @IsNumber()
    readonly idNews: number;

    @IsOptional()
    @IsString()
    readonly image?: string;

    @IsNotEmpty()
    @IsBoolean()
    readonly inWeb: boolean;
    
    @IsNotEmpty()
    @IsBoolean()
    readonly inClient: boolean;
    
    @IsNotEmpty()
    @IsBoolean()
    readonly inSlide: boolean;

    @IsNotEmpty()
    @IsString()
    readonly title: string;
    
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsOptional()
    @IsString()
    readonly link?: string;

    @IsOptional()
    @IsDate()
    readonly startDate?: Date;
    
    @IsOptional()
    @IsDate()
    readonly endDate?: Date;
}