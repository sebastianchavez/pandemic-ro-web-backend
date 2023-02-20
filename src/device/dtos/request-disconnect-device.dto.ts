import { IsNotEmpty, IsString } from "class-validator";

export class RequestDisconnectDeviceDto {
    @IsString()
    @IsNotEmpty()
    readonly socketId: string;
}