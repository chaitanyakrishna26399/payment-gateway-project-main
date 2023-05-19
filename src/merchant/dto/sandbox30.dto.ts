import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class Sandbox30Dto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	payeeProxyId: string;

    @ApiProperty()
	@IsNotEmpty()
	@IsString()
	payeeProxyType: string;

    @ApiProperty()
	@IsNotEmpty()
	@IsString()
	payeeAccountNumber: string;

    @ApiProperty()
	@IsNotEmpty()
	@IsString()
	payeeName: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	payerAccountNumber:string;

    
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	payerAccountName:string;

    
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	payerName:string;

    
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	sendingBankCode:string;

    
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	receivingBankCode:string;

    @ApiProperty()
	@IsNotEmpty()
	@IsString()
	amount:string;

    @ApiProperty()
	@IsNotEmpty()
	@IsString()
	transactionId:string;

    @ApiProperty()
	@IsNotEmpty()
	@IsString()
	transactionDateandTime:string;

    @ApiProperty()
	@IsNotEmpty()
	@IsString()
	billPaymentRef1:string;

    @ApiProperty()
	@IsNotEmpty()
	@IsString()
	billPaymentRef2:string;

    @ApiProperty()
	@IsNotEmpty()
	@IsString()
	billPaymentRef3:string;

    @ApiProperty()
	@IsNotEmpty()
	@IsString()
	currencyCode:string;

    @ApiProperty()
	@IsNotEmpty()
	@IsString()
	channelCode:string;

    @ApiProperty()
	@IsNotEmpty()
	@IsString()
	transactionType:string;
}