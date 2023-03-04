import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RequestUpdateRagnarokServerDto {
    @IsNotEmpty()
    @IsNumber()
    readonly idServer: number;

    @IsNotEmpty()
    @IsString()
    readonly name: string;
    
    @IsNotEmpty()
    @IsString()
    readonly description: string;
}