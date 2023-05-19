import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class NoteDto {
	@ApiProperty()
	@IsNotEmpty()
	note: {
        notes: string;
    };
}