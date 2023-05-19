import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserDepositDto {

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	userId: number;

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	amount: number;

}
