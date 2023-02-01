import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SaveProcessLockDto {
    @IsNotEmpty()
    @IsString()
    readonly typeValidation: string;
    
    @IsNotEmpty()
    @IsString()
    readonly value: string;
}
