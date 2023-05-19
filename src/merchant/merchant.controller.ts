import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { LoginMerchantDto } from './dto/login-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ResetPasswordDto } from './dto/reset-pwd.dto';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { InvoiceItemsDto } from './dto/invoice-items.dto';
import { PaymentDto } from './dto/payment.dto';
import { MerchantProfileDto } from './dto/merchant-profile.dto';
import { QrcodeDto } from './dto/qrcode.dto';
import { BankDetailsDto } from './dto/Bank-Details.dto';

import { MerchantService } from './merchant.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { NoteDto } from './dto/note.dto';
import { Sandbox30Dto } from './dto/sandbox30.dto';
import { SlipDto } from './dto/slip.dto';
import { MerchantGuard } from 'src/guards/merchant.guard';
import { VoidInvoiceDto } from './dto/void-invoice.dto';
import { LoginPublicDto } from './dto/login-public.dto';
//import { MailService } from './mail/mail.service';

@ApiTags('Merchant')
@Controller('merchant')
export class MerchantController {
  //mailService: MailService;
  constructor(private readonly merchantService: MerchantService) { }

  @Post('register')
  create(@Body() createMerchantDto: CreateMerchantDto) {
    return this.merchantService.create(createMerchantDto);
  }

  @Post('login')
  userLogin(@Body() loginMerchantDto: LoginMerchantDto) {
    return this.merchantService.login(loginMerchantDto)
  }

  @Post('authentication')
  userAuth(@Body() loginPublicDto: LoginPublicDto) {
    return this.merchantService.loginPublicApi(loginPublicDto)
  }

  //@ApiBearerAuth()
  //@UseGuards(MerchantGuard)
  @Patch('update-merchant')
  updateUser(
    @Query('email') email: string,
    @Body() updateMerchantDto: UpdateMerchantDto,
  ) {
    return this.merchantService.updateMerchant(email, updateMerchantDto);
  }

  //@ApiBearerAuth()
  //@UseGuards(MerchantGuard)
  @Get('get-profile')
  findMerchantProfile(@Query('email') email: string) {
    return this.merchantService.findMerchantProfile(email);
  }
  //@ApiBearerAuth()
  //@UseGuards(MerchantGuard)
  @Patch('update-profile')
  updateProfile(
    @Query('email') email: string,
    @Body() updateProfiletDto: MerchantProfileDto,
  ) {
    return this.merchantService.updateProfile(email, updateProfiletDto);
  }

  // @Get('get-password-reset-link/:email')
  // getPasswordResetLink(@Param('email') email: string) {
  //   console.log(email);
  //   return this.merchantService.resetMail(email);
  // }

  //@ApiBearerAuth()
  //@UseGuards(MerchantGuard)
  @Patch('forget-password')
  forgetPassword(
    @Query('email') email: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.merchantService.updatePassword(email, updatePasswordDto);
  }
  //@ApiBearerAuth()
  //@UseGuards(MerchantGuard)
  @Patch('reset-password')
  resetPassword(
    @Query('email') email: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.merchantService.resetPassword(email, resetPasswordDto);
  }
  //@ApiBearerAuth()
  //@UseGuards(MerchantGuard)
  @Post('create-invoice')
  invoice(
    @Query('merchantId') merchantId: string,
    @Body() createInvoiceDto: CreateInvoiceDto) {
    return this.merchantService.createInvoice(merchantId, createInvoiceDto);
  }
  // @ApiBearerAuth()
  // @UseGuards(MerchantGuard)
  @Get('get-invoice')
  getInvoice(@Query('email') email: string) {
    return this.merchantService.getInvoice(email);
  }

  //@ApiBearerAuth()
  //@UseGuards(MerchantGuard)
  @Get('invoice-details/:invoiceid')
  getInvoiceby(@Param('invoiceid') id: number) {
    return this.merchantService.invoiceDetails(id);
  }
  // @Post('add-invoice-items')
  // invoiceItems(@Body() invoiceItemsDto: InvoiceItemsDto) {
  //   return this.merchantService.invoiceItems(invoiceItemsDto);
  // }

  // @Get('get-invoice-items')
  // getInvoiceItems(@Query('invoiceId') invoiceid: number) {
  //   return this.merchantService.findAllItems(invoiceid);
  // }

  //@ApiBearerAuth()
  //@UseGuards(MerchantGuard)
  @Post('add-notes/:invoiceid')
  notes(@Param('invoiceid') id: number, @Body() noteDto: NoteDto) {
    return this.merchantService.notes(id, noteDto);
  }

  // @Post('pay')
  // pay(@Body() paymentDto: PaymentDto) {
  //   return this.merchantService.payment(paymentDto);
  // }
  //@ApiBearerAuth()
  //@UseGuards(MerchantGuard)
  @Get('transaction-history')
  transactionList(@Query("merchantId") merchantId: string) {
    return this.merchantService.transactionList(merchantId)
  }

  // @Post('deeplink')
  // deeplink(
  //   @Query("merchantId") merchantId: string,
  //   @Query("amount") amount: number
  // ) {
  //   return this.merchantService.deeplink(merchantId, amount);
  // }

  //@ApiBearerAuth()
  //@UseGuards(MerchantGuard)
  @Post('deeplink')
  deeplink() {
    return "success";
  }

  @Post('sandbox-QR30')
  qrcode(@Body() sandbox30dto:Sandbox30Dto) {
    return this.merchantService.response(sandbox30dto);
  }
  //@ApiBearerAuth()
  //@UseGuards(MerchantGuard)
  @Get('sandBox-transactionList')
  sandboxTransactionList(@Query("merchantId") merchantId: string){
    return this.merchantService.sandboxTransactionList(merchantId)
  }

  // @Get('payment-confirmation')
  // payment(
  //   @Query("rescode") rescode: number,
  //   @Query("transactionId") transactionId: number,
  //   @Query("confirmId") confirmId: number) {
  //   //return this.merchantService.response(rescode,transactionId,confirmId);
  // }

  //route name changed from payment-confirmation to inquiry
  //@ApiBearerAuth()
  //@UseGuards(MerchantGuard)
  @Get('payment-inquiry')
  paymentStatus(@Query("merchantId") merchantId: string,
    @Query("date") date: Date,
    @Query("reference1") reference1: string,
    @Query("reference2") reference2: string
  ) {
    return this.merchantService.paymentStatus(merchantId, date, reference1, reference2);
  }

  //@ApiBearerAuth()
  //@UseGuards(MerchantGuard)
  @Post('token')
  token(@Query("merchantId") merchantId: string) {
    return this.merchantService.token(merchantId);
  }

  //@ApiBearerAuth()
  //@UseGuards(MerchantGuard)
  @Get('transactionsById')
  transactionsById(@Query("merchantId") merchantId: string,
    @Query("transactionId") transactionId: string) {
    return this.merchantService.transactionsById(merchantId, transactionId)
  }
  //@ApiBearerAuth()
  //@UseGuards(MerchantGuard)
  @Get('slipVerification')
  slipVerification(
    @Query("merchantId") merchantId: string,
    @Query("slipVerification") slipVerification: string
    ) {
    return this.merchantService.slipVerification(merchantId, slipVerification);
  }

  // @Patch('bankDetails')
  // bankDetails(@Query('email') email: string,
  //   @Body() bankDetailsDto:BankDetailsDto){
  //   return this.merchantService.bankDetails(email,bankDetailsDto)
  // }

  //@ApiBearerAuth()
  //@UseGuards(MerchantGuard)
  @Post('withdrawRequest')
  withdrawRequest(@Query("merchantId") merchantId: string,
  //@Query("withdrawAmount") withdrawAmount: string,
    @Body() bankDetailsDto: BankDetailsDto
    ) {
    return this.merchantService.withdrawRequest(merchantId,bankDetailsDto)
  }

  //@ApiBearerAuth()
  //@UseGuards(MerchantGuard)
  @Get('totalAmount')
  totalAmount(@Query("merchantId") merchantId: string){
    return this.merchantService.totalAmount(merchantId)
  }

  //@ApiBearerAuth()
  //@UseGuards(MerchantGuard)
  @Get('list-of-Withdraw-request')
  ListOfWithdrawRequest(@Query("merchantId") merchantId: string){
    return this.merchantService.ListOfWithdrawRequest(merchantId)
  }
  //@ApiBearerAuth()
  //@UseGuards(MerchantGuard)
  @Get('withdraw-request-byId')
  WithdrawReqById(@Query('id') id: string) {
    return this.merchantService.WithdrawReqById(id);
  }

  @Post('void-invoice')
  void(@Query("invoiceId") invoiceId: string,
  //@Query("withdrawAmount") withdrawAmount: string,
    @Body() voidDto: VoidInvoiceDto
    ) {
    return this.merchantService.VoidInvoice(invoiceId,voidDto.void)
  }
}
