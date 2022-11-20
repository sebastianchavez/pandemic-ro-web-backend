import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RequestLockUserDto {

    @IsNumber()
    @IsNotEmpty()
    readonly account_id: number;

    @IsBoolean()
    @IsNotEmpty()
    readonly is_bg_lock: boolean;
    
    @IsDate()
    @IsNotEmpty()
    readonly start_date_bg_lock: Date;
    
    @IsDate()
    @IsNotEmpty()
    readonly end_date_bg_lock: Date;
    
    @IsBoolean()
    @IsNotEmpty()
    readonly is_woe_lock: boolean;
    
    @IsDate()
    @IsNotEmpty()
    readonly start_date_woe_lock: Date;
    
    @IsDate()
    @IsNotEmpty()
    readonly end_date_woe_lock: Date;
    
    @IsBoolean()
    @IsNotEmpty()
    readonly is_ban: boolean;
    
    @IsDate()
    @IsNotEmpty()
    readonly start_date_ban: Date;
    
    @IsDate()
    @IsNotEmpty()
    readonly end_date_ban: Date;
 
    @IsString()
    @IsNotEmpty()
    readonly admin: string;
}