import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AdminProfileDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  userName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  surName: string;

  @ApiProperty()
  @IsOptional()
  mobile: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  province: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  district: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  subdistrict: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  pincode: string;
}
