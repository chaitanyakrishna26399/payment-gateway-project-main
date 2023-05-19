import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, isNotEmpty, IsNumber, IsString } from "class-validator";
import { IsNull } from "typeorm";

export class CreateInvoiceDto {

	@ApiProperty()
	@IsNotEmpty()
	mobile: number;

	@ApiProperty()
	@IsNotEmpty()
	totalamount: number;

	@ApiProperty()
	@IsNotEmpty()
	expirydate: string;

}
