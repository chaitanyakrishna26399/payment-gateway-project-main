import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class QrcodeDto{
    @ApiProperty()
    @IsNumber()
    amount:number;

    @ApiProperty()
    @IsString()
    authorization:string;

}