import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, isNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { IsNull } from "typeorm";

export class ProfileDto {
	@ApiProperty()
	@IsString()
	userName: string;

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
	province: string;

    @ApiProperty()
	@IsString()
	district: string;

    @ApiProperty()
	subDivision: string;

    @ApiProperty()
	@IsNumber()
	pincode: number;

    @ApiProperty()
	@IsString()
	shopType: string;

    // @ApiProperty()
	// @IsBoolean()
	// creditCard: boolean;
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
	website: string;

	@ApiProperty()
	@IsOptional()
	facebook: string;

    @ApiProperty()
	@IsOptional()
	linkedin: string;

    @ApiProperty()
	@IsOptional()
	instagram: string;

    @ApiProperty()
	@IsOptional()
	company: string;

    @ApiProperty()
	@IsString()
	bank: string;

    @ApiProperty()
	@IsNumber()
	bankAccount: number;

    @ApiProperty()
	@IsOptional()
	rnfCode: string;

    @ApiProperty()
	@IsOptional()
	domestic: string;

    @ApiProperty()
	@IsOptional()
	inter: string;

    @ApiProperty()
	@IsOptional()
	rateQrCode: string;

    @ApiProperty()
	@IsOptional()
	rateBarCode: string;

    @ApiProperty()
	@IsString()
	copyOfId: string;

    @ApiProperty()
	@IsOptional()
	logo: string;

    @ApiProperty()
	@IsOptional()
	bankBook: string;

    @ApiProperty()
	@IsOptional()
	otherDocument: string;
}
