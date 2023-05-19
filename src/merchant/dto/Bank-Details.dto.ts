import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class BankDetailsDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	Name: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	WithdrawlAmount: number;

    @ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	AccountNumber: number;

    @ApiProperty()
	@IsNotEmpty()
	@IsString()
	IFSCcode: string;

    @ApiProperty()
	@IsNotEmpty()
	@IsString()
	BankName: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	comments:string;
}