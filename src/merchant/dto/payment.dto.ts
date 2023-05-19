import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, isNotEmpty, IsNumber, IsString } from "class-validator";
import { IsNull } from "typeorm";

export class PaymentDto {
 

	@ApiProperty()
	@IsNotEmpty()
	email: string;

	@ApiProperty()
	@IsNotEmpty()
	invoiceId: number;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	orderId: number;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	tax: number;

	@ApiProperty()
	@IsNotEmpty()
	amount: number;

    @ApiProperty()
	@IsNotEmpty()
	status: string;

    @ApiProperty()
	@IsNotEmpty()
	paymentType: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	createdAt: Date;
}
