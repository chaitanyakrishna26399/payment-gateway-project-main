import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdatePasswordDto {

  @ApiProperty({ required: true })
  @IsString()
  newPassword?: string;

}
