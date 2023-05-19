import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SlipDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	slipNumber: string;
}