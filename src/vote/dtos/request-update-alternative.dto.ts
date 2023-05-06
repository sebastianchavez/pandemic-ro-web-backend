import { IsNotEmpty, IsString } from "class-validator";

export class RequestUpdateAlternativeDto {
    @IsNotEmpty()
    @IsString()
    readonly alternative: string;

    @IsNotEmpty()
    @IsString()
    readonly value: string;
}