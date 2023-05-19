import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class VoidInvoiceDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsBoolean()
	void: boolean;
}