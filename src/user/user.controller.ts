import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUsertDto } from './dto/login-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ResetPasswordDto } from './dto/reset-password-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { MerchantService } from 'src/merchant/merchant.service';
import { UserDepositDto } from './dto/user-deposite.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateInvoiceDto } from 'src/merchant/dto/create-invoice.dto';
import { ProfileDto } from './dto/profile.dto';
import { UserGuard } from 'src/guards/user.guard';


@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly merchantService: MerchantService
  ) { }
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUsertDto) {
    return this.userService.login(loginUserDto);
  }

  // @ApiBearerAuth()
  // @UseGuards(UserGuard)
  @Patch('update-user')
  updateUser(
    @Query('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(email, updateUserDto);
  }
  // @ApiBearerAuth()
  // @UseGuards(UserGuard)
  @Patch('update-profile')
  updateProfile(
    @Query('email') email: string,
    @Body() updateProfiletDto: ProfileDto,
  ) {
    return this.userService.updateProfile(email, updateProfiletDto);
  }

  // @ApiBearerAuth()
  // @UseGuards(UserGuard)
  @Get('get-profile')
  findProfiUserle(@Query('email') email: string) {
    return this.userService.findUserProfile(email);
  }

  // @ApiBearerAuth()
  // @UseGuards(UserGuard)
  @Patch('forget-password')
  forgetPassword(
    @Query('email') email: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.updatePassword(email, updatePasswordDto);
  }
  // @ApiBearerAuth()
  // @UseGuards(UserGuard)
  @Patch('reset-password')
  resetPassword(
    @Query('email') email: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.userService.resetPassword(email, resetPasswordDto);
  }
  // @ApiBearerAuth()
  // @UseGuards(UserGuard)
  @Post('create-invoice')
  invoice(
    @Query('merchantId') merchantId: string,
    @Body() createInvoiceDto: CreateInvoiceDto) {
    return this.merchantService.createInvoice(merchantId, createInvoiceDto);
  }
  // @ApiBearerAuth()
  // @UseGuards(UserGuard)
  @Get('ListOfInvoice')
  ListOfInvoice(@Query('email') email:string) {
    return this.userService.ListOfInvoice(email)
  }
  // @Post('add-invoice-items')
  // invoiceItems(@Body() invoiceItemsDto: InvoiceItemsDto) {
  //   return this.merchantService.invoiceItems(invoiceItemsDto);
  // }
  // @Post('pay')
  // pay(@Body() paymentDto: PaymentDto) {
  //   return this.merchantService.payment(paymentDto);
  // }

  // @ApiBearerAuth()
  // @UseGuards(UserGuard)
  @Get('invoice-details/:invoiceid')
  getInvoiceby(@Param('invoiceid') id: number){
    return this.merchantService.invoiceDetails(id);
  }

  // @ApiBearerAuth()
  // @UseGuards(UserGuard)
  @Get('User_total_Amount')
  getTotalAmount(@Query('email') email:string){
    return this.userService.getTotalAmount(email)
  }
}
