import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RequestSendVoteQuestionDto {
    @IsNotEmpty()
    @IsNumber()
    readonly idQuestion: number;
    
    @IsNotEmpty()
    @IsString()
    readonly response: string;

    @IsNotEmpty()
    @IsString()
    readonly ip: string;
}