import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, isNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { IsNull } from "typeorm";

export class MerchantProfileDto {

	// @ApiProperty()
	// @IsString()
	// merchantId: string;

	@ApiProperty()
	@IsString()
	merchantNameEnglish: string;

	@ApiProperty()
	@IsString()
	merchantName: string;

    @ApiProperty()
	@IsString()
	entityType: string;

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
	@IsOptional()
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
	mobilePayment: boolean;

    @ApiProperty()
	@IsBoolean()
	bankTransfer: boolean;

    // @ApiProperty()
	// @IsBoolean()
	// alone: boolean;

    @ApiProperty()
	@IsOptional()
	@IsString()
	website: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	facebook: string;

    @ApiProperty()
	@IsOptional()
	@IsString()
	linkedin: string;

    @ApiProperty()
	@IsOptional()
	@IsString()
	instagram: string;

    @ApiProperty()
	@IsOptional()
	@IsString()
	company: string;

    @ApiProperty()
	@IsString()
	bank: string;

    @ApiProperty()
	@IsNumber()
	bankAccount: number;

    @ApiProperty()
	@IsOptional()
	@IsString()
	rnfCode: string;

    @ApiProperty()
	@IsOptional()
	@IsString()
	domestic: string;

    @ApiProperty()
	@IsOptional()
	@IsString()
	inter: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	rateQrCode: string;

    @ApiProperty()
	@IsOptional()
	@IsString()
	rateBarCode: string;

    @ApiProperty()
	@IsString()
	copyOfId: string;

    @ApiProperty()
	@IsOptional()
	@IsString()
	logo: string;

    @ApiProperty()
	@IsOptional()
	@IsString()
	bankBook: string;

    @ApiProperty()
	@IsOptional()
	@IsString()
	otherDocument: string;

// 	@ApiProperty()
// 	@IsNotEmpty()
// 	@IsString()
// 	confirmPassword: string;
}
