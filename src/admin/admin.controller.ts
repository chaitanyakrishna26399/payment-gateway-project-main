import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { AssignDto } from './dto/assign.dto';
import { ChangeEmailDto } from './dto/change-email.dto';
import { ChangeNameDto } from './dto/change-name.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateMerchantDto } from 'src/merchant/dto/create-merchant.dto';
import { MerchantService } from 'src/merchant/merchant.service';
import { AdminProfileDto } from './dto/admin-profile.dto';
import { FeesDto } from './dto/fees.dto';
import { TxnDto } from './dto/txn.dto';
import { AdminGuard } from 'src/guards/admin.guard';


@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService,
    private readonly merchantService: MerchantService) { }

  @Post('register')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Post('login')
  loginAdmin(@Body() loginAdminDto: LoginAdminDto) {
    return this.adminService.login(loginAdminDto);
  }

  //   @Get('get-one')
  //   findOne(@Query('email') email: string) {
  //     return this.adminService.findOne(email);
  //   }

  @Patch('update-admin')
  updateAdmin(
    @Query('email') email: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.updateAdmin(email, updateAdminDto);
  }
  // @ApiBearerAuth()
  // @UseGuards(AdminGuard)
  @Patch('forget-password')
  forgetPassword(
    @Query('email') email: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.adminService.updatePassword(email, updatePasswordDto);
  }

  // @ApiBearerAuth()
  // @UseGuards(AdminGuard)
  @Patch('update-profile')
  updateProfile(
    @Query('email') email: string,
    @Body() updateProfiletDto: AdminProfileDto,
  ) {
    return this.adminService.updateProfile(email, updateProfiletDto);
  }
  // @ApiBearerAuth()
  // @UseGuards(AdminGuard)
  @Get('get-profile')
  findAdminProfile(@Query('email') email: string) {
    return this.adminService.findAdminProfile(email);
  }

  // @ApiBearerAuth()
  // @UseGuards(AdminGuard)
  @Post('merchant-registration')
  register(@Body() createMerchantDto: CreateMerchantDto) {
    return this.merchantService.create(createMerchantDto);
  }

  // @ApiBearerAuth()
  // @UseGuards(AdminGuard)
  @Get('get-merchant-list')
  findMerchant() {
    return this.adminService.findMerchant();
  }

  // @ApiBearerAuth()
  // @UseGuards(AdminGuard)
  @Get('get-merchant-By-Id')
  findMerchantById(@Query('merchantId') merchantId: string) {
    return this.adminService.findMerchantById(merchantId);
  }

  // @ApiBearerAuth()
  // @UseGuards(AdminGuard)
  @Get('get-user-list')
  findUser() {
    return this.adminService.findUser();
  }

  // @ApiBearerAuth()
  // @UseGuards(AdminGuard)
  @Patch('assign-merchant-to-user')
  assign(@Body() assignDto: AssignDto) {
    return this.adminService.assign(assignDto);
  }
  // @ApiBearerAuth()
  // @UseGuards(AdminGuard)
  @Delete('/delete-user/:email')
  remove(@Param('email') email: string) {
    return this.adminService.remove(email);
  }

  // @ApiBearerAuth()
  // @UseGuards(AdminGuard)
  @Get('withdraw-request')
  WithdrawReq() {
    return this.adminService.WithdrawReq();
  }

  // @ApiBearerAuth()
  // @UseGuards(AdminGuard)
  @Get('withdraw-request-byId')
  WithdrawReqById(@Query('id') id: string) {
    return this.adminService.WithdrawReqById(id);
  }

  // @ApiBearerAuth()
  // @UseGuards(AdminGuard)
  @Post('PaymentStatus')
  PaymentStatus(@Query('ReferenceId') ReferenceId:string,
  @Body() Txndto:TxnDto ){
    return this.adminService.PaymentStatus(ReferenceId,Txndto.PaymentStatus)
  }

  // @ApiBearerAuth()
  // @UseGuards(AdminGuard)
  @Patch('fees-by-id')
  FeesById(@Query('merchantId') merchantId: string,
    @Body() Feesdto:FeesDto ) {
    return this.adminService.FeesById(merchantId,Feesdto);
  }


   // @ApiBearerAuth()
  // @UseGuards(AdminGuard)
  @Get('TotalCount')
  TotalCount(){
    return this.adminService.TotalCount();
  }


  @Get('sandBox-transactionList')
  sandboxTransactionList(){
    return this.adminService.sandboxTransactionList()
  }

}

