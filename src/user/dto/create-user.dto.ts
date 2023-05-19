import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNotEmpty, isNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";
import { IsNull } from "typeorm";

export class CreateUserDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	mobile: number;

	@ApiProperty()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	password: string;

	@ApiProperty()
	@IsNotEmpty()
	@ValidateIf((o) => o.operational_type !== '')
	@IsIn(['web', 'api'])
	@IsString()
	typeOfStreem: string;
}
