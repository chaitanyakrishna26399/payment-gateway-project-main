import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AssignDto {
	@ApiProperty()
	@IsNotEmpty()
	merchantEmail: string[];

    @ApiProperty()
	@IsNotEmpty()
	@IsString()
	userEmail: string;
}
