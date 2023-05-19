import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ResetPasswordDto {

  @ApiProperty({ required: true })
  @IsString()
  oldPassword?: string;

  @ApiProperty({ required: true })
  @IsString()
  newPassword?: string;

}
