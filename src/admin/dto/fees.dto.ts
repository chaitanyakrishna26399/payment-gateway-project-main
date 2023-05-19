import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString ,IsNumber} from "class-validator";

export class FeesDto {
	@ApiProperty()
    @IsNumber()
	TransactionFee:number;

    @ApiProperty()
	@IsNumber()
	withdrawFee: number;
}