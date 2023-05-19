import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, isNotEmpty, IsNumber, IsString } from "class-validator";
import { IsNull } from "typeorm";

export class InvoiceItemsDto {

	@ApiProperty()
	@IsNotEmpty()
	invoiceId: number;

	@ApiProperty()
	@IsNotEmpty()
	orderId: number;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	items: string;

	@ApiProperty()
	@IsNotEmpty()
	amount: number;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	createdAt: Date;
}
