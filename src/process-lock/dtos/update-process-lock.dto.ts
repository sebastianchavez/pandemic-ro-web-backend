import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateProcessLockDto {

    @IsNotEmpty()
    @IsNumber()
    readonly processlock_id: number;

    @IsNotEmpty()
    @IsString()
    readonly typeValidation: string;
    
    @IsNotEmpty()
    @IsString()
    readonly value: string;    
}