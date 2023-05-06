import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RequestSaveQuestionDto {
    @IsNotEmpty()
    @IsString()
    question: string;

    @IsNotEmpty()
    @IsNumber()
    idServer:number;

    @IsNotEmpty()
    @IsDate()
    startDate: Date;

    @IsNotEmpty()
    @IsDate()
    endDate: Date

    @IsNotEmpty()
    alternatives: any
}