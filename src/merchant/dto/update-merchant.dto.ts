import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateMerchantDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  newName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  newPassword?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  newEmail?: string;
}
