import { IsNotEmpty, IsString } from "class-validator";

export class RequestUpdateNewsImageDto {
    @IsNotEmpty()
    @IsString()
    readonly image: string;
    
    @IsNotEmpty()
    @IsString()
    readonly nameImage: string;
}