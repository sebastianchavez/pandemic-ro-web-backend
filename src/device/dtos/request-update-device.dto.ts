import { IsNotEmpty, IsString } from "class-validator";

export class RequestUpdateDeviceDto {
    @IsNotEmpty()
    @IsString()
    readonly mac: string;

    @IsNotEmpty()
    @IsString()
    readonly ip: string;
    
    @IsNotEmpty()
    @IsString()
    readonly os: string; 
}