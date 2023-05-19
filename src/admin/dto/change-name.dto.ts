import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ChangeNameDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	newName: string;
}
