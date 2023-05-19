import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, isNotEmpty, IsNumber, IsString } from "class-validator";
import { IsNull } from "typeorm";

export class ProfileDto {
	@ApiProperty()
	@IsString()
	merchantName: string;

    @ApiProperty()
	@IsString()
	personType: string;

    @ApiProperty()
	@IsString()
	InitialShop: string;

    @ApiProperty()
	@IsString()
	firstName: string;

    @ApiProperty()
	@IsString()
	surName: string;

    @ApiProperty()
	@IsString()
	yearOfBirth: string;

    @ApiProperty()
	@IsString()
	monthOfBirth: string;

    @ApiProperty()
	@IsString()
	dayOfBirth: string;

	@ApiProperty()
	@IsNumber()
	mobile: number;

    @ApiProperty()
	@IsString()
	address: string;

    @ApiProperty()
	@IsString()
	province: string;

    @ApiProperty()
	@IsString()
	district: string;

    @ApiProperty()
	@IsString()
	subDivision: string;

    @ApiProperty()
	@IsNumber()
	pincode: number;

    @ApiProperty()
	@IsString()
	shopType: string;

    @ApiProperty()
	@IsBoolean()
	creditCard: boolean;

    @ApiProperty()
	@IsBoolean()
	weChat: boolean;

    @ApiProperty()
	@IsBoolean()
	livePayment: boolean;

    @ApiProperty()
	@IsBoolean()
	mobileBanking: boolean;

    @ApiProperty()
	@IsBoolean()
	trueWallet: boolean;

    @ApiProperty()
	@IsBoolean()
	shopeePay: boolean;

    @ApiProperty()
	@IsBoolean()
	alone: boolean;

    @ApiProperty()
	@IsString()
	website: string;

	@ApiProperty()
	@IsString()
	facebook: string;

    @ApiProperty()
	@IsString()
	linkedin: string;

    @ApiProperty()
	@IsString()
	instagram: string;

    @ApiProperty()
	@IsString()
	other: string;

    @ApiProperty()
	@IsString()
	company: string;

    @ApiProperty()
	@IsString()
	bank: string;

    @ApiProperty()
	@IsNumber()
	bankAccount: number;

    @ApiProperty()
	@IsString()
	rnfCode: string;

    @ApiProperty()
	@IsString()
	domestic: string;

    @ApiProperty()
	@IsString()
	inter: string;

// 	@ApiProperty()
// 	@IsNotEmpty()
// 	@IsString()
// 	confirmPassword: string;
}
