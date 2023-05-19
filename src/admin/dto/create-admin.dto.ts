import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, isNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAdminDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string;

// 	@ApiProperty()
// 	@IsNotEmpty()
// 	@IsNumber()
// 	mobile: number;

	@ApiProperty()
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	password: string;

// 	@ApiProperty()
// 	@IsNotEmpty()
// 	@IsString()
// 	confirmPassword: string;
}
