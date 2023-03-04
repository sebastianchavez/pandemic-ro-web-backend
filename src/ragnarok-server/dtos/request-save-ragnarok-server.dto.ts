import { IsNotEmpty, IsString } from "class-validator";

export class RequestSaveRagnarokServerDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    
    @IsNotEmpty()
    @IsString()
    readonly description: string;
}