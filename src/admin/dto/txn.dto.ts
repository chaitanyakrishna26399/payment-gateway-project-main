import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsIn, IsString, ValidateIf } from "class-validator";

export class TxnDto {
	@ApiProperty()
	@IsBoolean()
	// @ValidateIf((o) => o.operational_type !== '')
	// @IsIn(['completed', 'reject'])
	PaymentStatus:boolean;
}