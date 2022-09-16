
import { IsString, IsNotEmpty, IsBase64 } from 'class-validator';

export class UpdateFileDto {

    @IsString()
    @IsNotEmpty()
    readonly version: string;

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @IsBase64()
    readonly file: string;

}