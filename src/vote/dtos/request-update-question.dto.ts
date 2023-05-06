import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class RequestUpdateQuestionDto {
    @IsNotEmpty()
    @IsNumber()
    readonly idQuestion: number;

    @IsNotEmpty()
    @IsString()
    readonly question: string;
    
    @IsNotEmpty()
    @IsNumber()
    readonly idServer: number;

    @IsOptional()
    @IsDate()
    readonly startDate?: Date;
    
    @IsOptional()
    @IsDate()
    readonly endDate?: Date
}