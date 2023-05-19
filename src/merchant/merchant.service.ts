import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { LoginMerchantDto } from './dto/login-merchant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Merchant } from './entities/merchant.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateAdminDto } from 'src/admin/dto/update-admin.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ResetPasswordDto } from './dto/reset-pwd.dto';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { InvoiceItems } from './entities/invoice-items.entity';
import { InvoiceItemsDto } from './dto/invoice-items.dto';
import { PaymentDto } from './dto/payment.dto';
import { Payment } from './entities/payment.entity';
import { JwtService } from '@nestjs/jwt';
import { MerchantProfileDto } from './dto/merchant-profile.dto';
import { Qrcode } from './entities/qrcode.entity';
import { QrcodeDto } from './dto/qrcode.dto';
import { NoteDto } from './dto/note.dto';
import { DeepLink } from './entities/depplink.entity';
import { withdrawRequest } from './entities/withdraw-Request.entity';
import { Sandbox30 } from './entities/Sandbox30.entity';
import { exit } from 'process';
import { VoidInvoiceDto } from './dto/void-invoice.dto';
import { LoginPublicDto } from './dto/login-public.dto';
//import { MailService } from './mail/mail.service';


@Injectable()
export class MerchantService {
   
  constructor(
    //private mailService: MailService,
    @InjectRepository(Merchant) private merchantRepository: Repository<Merchant>,
    @InjectRepository(Invoice) private invoiceRepository: Repository<Invoice>,
    @InjectRepository(InvoiceItems) private invoiceItemsRepository: Repository<InvoiceItems>,
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
    @InjectRepository(Qrcode) private qrcodeRepository: Repository<Qrcode>,
    @InjectRepository(DeepLink) private deeplinkRepository: Repository<DeepLink>,
    @InjectRepository(withdrawRequest) private withdrawRepository: Repository<withdrawRequest>,
    @InjectRepository(Sandbox30) private sandbox30Repository: Repository<Sandbox30>,

    private jwtService: JwtService,




  ) { }
  //register
  async create(createMerchantDto: CreateMerchantDto) {
    const email = createMerchantDto.email;
    const [findMerchant] = await this.merchantRepository.find({ where: { email } });
    if (!findMerchant) {
      try {
        const merchant = this.merchantRepository.create(createMerchantDto);
        await this.merchantRepository.save(merchant);
        return { statuscode:200,message: "registered successfully" };
      } catch (err) {
        console.log('Error creating merchant', err);
        throw new InternalServerErrorException();
      }
    } else {
      return { statuscode:201,message: "Email already exist" }
    }
  }

  //validation
  private async checkPassword(
    pass: string,
    hashedPass: string,
  ): Promise<boolean> {
    const isPassMatch = await bcrypt.compare(pass, hashedPass);
    if (!isPassMatch) return false;
    return true;
  }
  async findOne(email: string) {
    const merchant = await this.merchantRepository.findOne({ where: { email } });
    if (!merchant) throw new NotFoundException();
    return merchant;
  }
  async validateUserPassword(email: string, password: string) {
    const merchant = await this.findOne(email);

    if (!merchant)
      throw new HttpException(
        'Email or Password is incorrect',
        HttpStatus.NOT_FOUND,
      );

    const passIsCorrect = await this.checkPassword(password, merchant.password);
    if (merchant && passIsCorrect) return merchant;
    else
      throw new HttpException(
        'Username or password incorrect',
        HttpStatus.BAD_REQUEST,
      );
  }


  //login
  async login(loginMerchantDto: LoginMerchantDto) {
    const { email, password} = loginMerchantDto;
    const merchant = await this.merchantRepository.findOne({ where: { email } });  
    const result = await this.validateUserPassword(email, password);
    const payload = { email: result.email, isMerchant: true };
    console.log('payload', payload);
    const accessToken = this.jwtService.sign(payload);
    return { code: 200, message: "Login success", accessToken, merchantUid: merchant.merchantId };
    
  }

   //login for Public Api
   async loginPublicApi(loginMerchantDto: LoginPublicDto) {
    const { email, password,ApiKey } = loginMerchantDto;
    const merchant = await this.merchantRepository.findOne({ where: { email } });  
    const result = await this.validateUserPassword(email, password);
    if(ApiKey == result.merchantApi){
    const payload = { email: result.email, isMerchant: true };
    console.log('payload', payload);
    const accessToken = this.jwtService.sign(payload);
    return { code: 200, message: "Login success", accessToken, merchantUid: merchant.merchantId };
    }
    else{
      return{message:'Apikey is incorrect'}
    }
    
  }

  async updateMerchant(email: string, updateMerchantDto: UpdateAdminDto) {
    const { newPassword, newEmail, newName } = updateMerchantDto;
    const merchant = await this.findOne(email);
    if (!merchant) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    if (newPassword) merchant.password = newPassword;
    if (newEmail) merchant.email = newEmail;
    if (newName) merchant.name = newName;

    await this.merchantRepository.save(merchant);
    return { code: 201, message: 'Password updated' };
  }

  async findMerchantProfile(email: string) {
    const merchant = await this.merchantRepository.findOne({ where: { email } });
    if (!merchant) throw new NotFoundException();
    return { message: "success", merchant };
  }

  async updatePassword(email: string, updatePasswordDto: UpdatePasswordDto) {
    const { newPassword } = updatePasswordDto;
    const merchant = await this.findOne(email);
    if (!merchant) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (newPassword) merchant.password = newPassword;
    await this.merchantRepository.save(merchant);
    return { code: 201, message: 'Password updated' };
  }

  async createInvoice(merchantId, createInvoiceDto: CreateInvoiceDto) {
    const rand = Math.floor(Math.random() * 1000000)
    const invoiceRefId = "inv#" + rand;
    try {
      //console.log(createInvoiceDto);
      const merchantData = await this.merchantRepository.findOne({ where: { merchantId: merchantId } })
      if(merchantData.assignedUser == null){
        return { message: 'Merchant is not assigned to any User' }
      }
      const invoice = this.invoiceRepository.create(createInvoiceDto);
      invoice.invoiceRefId = invoiceRefId;
      invoice.createdAt = new Date;
      // const result = await this.invoiceRepository.save(invoice);
      if (invoice) {
        const token = await this.token(merchantId);
        //const merchantData = await this.merchantRepository.findOne({ where: { merchantId: merchantId } })
        const qr = await this.qrcode(merchantId, invoice.totalamount, token.data.accessToken, invoice.expirydate);
        invoice.expirydate = qr.response.data.expiryDate;
        invoice.qrRawData = qr.response.data.qrRawData;
        invoice.numberOfTimes = qr.response.data.numberOfTimes;
        invoice.qrImage = qr.response.data.qrImage;
        invoice.reference1 = qr.refData.ref1;
        invoice.reference2 = qr.refData.ref2;
        invoice.merchantId = merchantId;
        invoice.billFrom = merchantData.email;
        invoice.billTo = merchantData.assignedUser;
        const result = await this.invoiceRepository.save(invoice);
        if (result) {
          return {
            code: 200,
            message: 'Invoice created',
            qrdata: qr.response.data
          }
        }
        else {
          return { message: 'Fail to create invoice' }
        }
      }
    } catch (err) {
      console.log('Error creating invoice', err);
      throw new InternalServerErrorException();
    }

  }
  // async invoiceItems(invoiceItemsDto: InvoiceItemsDto) {
  //   try {
  //     console.log(invoiceItemsDto);
  //     const invoiceItems = this.invoiceItemsRepository.create(invoiceItemsDto);
  //     const result = await this.invoiceItemsRepository.save(invoiceItems);
  //     return {
  //       result,
  //       code: 201,
  //       message: 'added successfully',
  //     };
  //   } catch (err) {
  //     console.log('Error creating invoice', err);
  //     throw new InternalServerErrorException();
  //   }

  // }

  async findAllItems(invoiceid: number) {
    //const invoice = invoiceid;
    const query = this.invoiceItemsRepository.createQueryBuilder('it');
    query
      .select([
        'it.amount,it.items,it.id'
      ])
      .where('it.invoice_id = invoice_id', { invoice: invoiceid })
      .groupBy('it.invoice_id,it.items,it.id');
    const result = {
      count: await query.getCount(),
      data: await query.getRawMany(),
    };
    return result;
  }

  // async payment(paymentDto: PaymentDto) {
  //   try {
  //     console.log(paymentDto);
  //     const pay = this.paymentRepository.create(paymentDto);
  //     const result = await this.paymentRepository.save(pay);
  //     return {
  //       result,
  //       code: 201,
  //       message: 'added successfully',
  //     };
  //   } catch (err) {
  //     console.log('Error creating invoice', err);
  //     throw new InternalServerErrorException();
  //   }

  // }
  async getInvoice(email: string) {

    // try {
    //   var date2 = new Date()
    //   var d = date2.getDate();
    //   var m = date2.getMonth() + 1;
    //   var y = date2.getFullYear();
    //   var h = date2.getHours();
    //   var mm = date2.getMinutes();
    //   var ss = date2.getSeconds();
    //   var dateString = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d) + ' ' + (h <= 9 ? '0' + h : h) + ':' + (mm <= 9 ? '0' + mm : mm) + ':' + (ss <= 9 ? '0' + ss : ss);
    //   var invoice = await this.invoiceRepository.createQueryBuilder('t')
    //     .where("t.billFrom= :billFrom", { billFrom: email })
    //     .andWhere("t.expirydate>:dateString", { dateString: dateString })
    //     .andWhere("t.status=:status", { status: false })
    //     .andWhere("t.void = false")
    //   var pending
    //   if (await invoice.getCount() >= 1) {
    //     pending = await invoice.getRawMany()
    //   } else {
    //     pending = 0
    //   }
    //   var invoice1 = await this.invoiceRepository.createQueryBuilder('t')
    //     .where("t.billFrom= :billFrom", { billFrom: email })
    //     .andWhere("t.status=:status", { status: true })
    //     .andWhere("t.void = false")
    //   var paid
    //   if (await invoice1.getCount() >= 1) {
    //     paid = await invoice1.getRawMany()
    //   } else {
    //     paid = 0
    //   }
    //   var invoice2 = await this.invoiceRepository.createQueryBuilder('t')
    //     .where("t.billFrom= :billFrom", { billFrom: email })
    //     .andWhere("t.expirydate<:dateString", { dateString: dateString })
    //     .andWhere("t.status=:status", { status: false })
    //     .andWhere("t.void = true")
    //   var expired
    //   if (await invoice2.getCount() >= 1) {
    //     expired = await invoice2.getRawMany()
    //   } else {
    //     expired = 0
    //   }

    //   var invoice4 = await this.invoiceRepository.createQueryBuilder('t')
    //     .where("t.billFrom= :billFrom", { billFrom: email })
    //     .andWhere("t.expirydate<:dateString", { dateString: dateString })
    //     .andWhere("t.status=:status", { status: false })
    //     .andWhere("t.void = true")
    //   var voidInvoice
    //   if (await invoice4.getCount() >= 1) {
    //     voidInvoice = await invoice4.getRawMany()
    //   } else {
    //     voidInvoice = 0
    //   }
    //   return { pending, paid, expired, voidInvoice }
    // } catch (err) {
    //   return err
    // }
    const merchant = await this.invoiceRepository.find({ where: { billFrom:email } });
    if (!merchant) throw new NotFoundException();
    return merchant
  }

  async invoiceDetails(id: number) {
    const invoice = await this.invoiceRepository.findOne({ where: { id } });
    if (!invoice) throw new NotFoundException();
    return invoice
  }

  async paymentlist() {
    const transactionlist = await this.paymentRepository.find();
    if (!transactionlist) throw new NotFoundException();
    return { transactionlist }
  }

  async updateProfile(email: string, updateProfileDto: MerchantProfileDto) {
    const {
      merchantNameEnglish,
      merchantName,
      entityType,
      InitialShop,
      firstName,
      surName,
      yearOfBirth,
      monthOfBirth,
      dayOfBirth,
      mobile,
      address,
      province,
      district,
      subDivision,
      shopType,
      mobilePayment,
      bankTransfer,
      website,
      facebook,
      linkedin,
      instagram,
      company,
      bank,
      bankAccount,
      rnfCode,
      domestic,
      inter,
      rateQrCode,
      rateBarCode,
      copyOfId,
      logo,
      bankBook,
      otherDocument,
      pincode

    } = updateProfileDto;
    const merchant = await this.findOne(email);
    if (!merchant) throw new HttpException('Merchant not found', HttpStatus.NOT_FOUND);
    if (merchantNameEnglish) merchant.merchantNameEnglish = merchantNameEnglish;
    if (merchantName) merchant.merchantName = merchantName;
    if (entityType) merchant.personType = entityType;
    if (InitialShop) merchant.InitialShop = InitialShop;
    if (firstName) merchant.firstName = firstName;
    if (surName) merchant.surName = surName;
    if (yearOfBirth) merchant.yearOfBirth = yearOfBirth;
    if (monthOfBirth) merchant.monthOfBirth = monthOfBirth;
    if (dayOfBirth) merchant.dayOfBirth = dayOfBirth;
    if (mobile) merchant.mobile = mobile;
    if (address) merchant.address = address;
    if (province) merchant.province = province;
    if (district) merchant.district = district;
    if (subDivision) merchant.subDivision = subDivision;
    if (shopType) merchant.shopType = shopType;
    if (pincode) merchant.pincode = pincode;
    if (mobilePayment) {
      merchant.mobilePayment = true;
    }
    else {
      merchant.mobilePayment = false;
    }
    if (bankTransfer) {
      merchant.bankTransfer = true;
    }
    else {
      merchant.bankTransfer = false;
    }
    
    if (website) merchant.website = website;
    if (facebook) merchant.facebook = facebook;
    if (linkedin) merchant.linkedin = linkedin;
    if (instagram) merchant.instagram = instagram;
    if (company) merchant.company = company;
    if (bank) merchant.bank = bank;
    if (bankAccount) merchant.bankAccount = bankAccount;
    if (rnfCode) merchant.rnfCode = rnfCode;
    if (domestic) merchant.domestic = domestic;
    if (inter) merchant.inter = inter;
    if (rateQrCode) merchant.rateQrCode = rateQrCode;
    if (rateBarCode) merchant.rateBarCode = rateBarCode;
    if (copyOfId) merchant.copyOfId = copyOfId;
    if (logo) merchant.logo = logo;
    if (bankBook) merchant.bankBook = bankBook;
    if (otherDocument) merchant.otherDocument = otherDocument;

    await this.merchantRepository.save(merchant);
    return { code: 200, message: 'Updated successfully' };
  }
  async resetPassword(email: string, resetPasswordDto: ResetPasswordDto) {
    const { oldPassword, newPassword } = resetPasswordDto;
    const user = await this.findOne(email);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const passIsCorrect = await this.checkPassword(oldPassword, user.password);
    if (user && passIsCorrect) {
      if (newPassword) user.password = newPassword;
      await this.merchantRepository.save(user);
      return { code: 200, message: "Updated Successfully" };
    }
    else {
      return { message: "Old password is wrong,try again" };
    }
  }

  async token(merchantId) {
    const request = require('request-promise');

    const options = {
      method: 'POST',
      uri: 'https://api.partners.scb/partners/v1/oauth/token',
      body: {
        "applicationKey": process.env.APPLICATIONKEY,
        "applicationSecret": process.env.APPLICATIONSECRET
      },
      json: true,
      headers: {
        'Content-Type': 'application/json',
        'resourceOwnerId': process.env.APPLICATIONKEY,
        'requestUId': merchantId,
        'accept-language': 'EN'

      }
    }

    var res = await request(options).then(function (response) {
      // console.log(response);
      return response
    })
      .catch(function (err) {
        return err
      })
    return res
  }

  refGenerator() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 20; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async qrcode(merchantId, amount, authorization, expiryDate) {
    const request = require('request-promise');
    const options = {
      method: 'POST',
      uri: 'https://api.partners.scb/partners/v1/payment/qrcode/create',
      body: {
        "qrType": "PP",
        "ppType": "BILLERID",
        "ppId": "012355500806301",
        "amount": amount,
        "ref1": this.refGenerator(),
        "ref2": this.refGenerator(),
        "ref3": "SCB",
        "expiryDate": expiryDate,
        "numberOfTimes": 1
      },
      json: true,
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${authorization}`,
        'resourceOwnerId': process.env.APPLICATIONKEY,
        'requestUId': merchantId,
        'accept-language': 'EN'

      }
    }
    var refData = { ref1: options.body.ref1, ref2: options.body.ref2 }
    console.log(refData)
    var res = await request(options).then(async function (response) {
      return { response, refData }
      // return { message: "registered successfully", response };
    })

      .catch(function (err) {
        return err
      })
    //this.qrcodeRepository.save(res.data);
    return res
  }
  async notes(id: number, noteDto: NoteDto) {
    const merchant = await this.invoiceRepository.findOne({ where: { id } });
    //console.log(merchant);
    //const { note } = noteDto;
    merchant.note = noteDto.note;
    const result = await this.invoiceRepository.save(merchant);
    console.log(result);
    if (result) {
      return {
        code: 200,
        message: "note added"
      }
    }
  }

  async deeplink(merchantId, amount) {
    const token = await this.token(merchantId);
    // console.log(token)
    const authorization = token.data.accessToken;
    const request = require('request-promise');
    const options = {
      method: 'POST',
      uri: 'https://api-uat.partners.scb/partners/v3/deeplink/transactions',

      body: {
        "transactionType": "PURCHASE",
        "transactionSubType": [
          "BP"
        ],
        "sessionValidityPeriod": 1800,
        "sesisionValidUntil": 1800,
        "billPayment": {
          "paymentAmount": amount,
          "accountTo": "123456789012345",
          "ref1": this.refGenerator(),
          "ref2": this.refGenerator(),
          "ref3": "SCB"
        },
        "merchantMetaData": {
          "callbackUrl": "http://my.server.com/bar",
          "paymentInfo": [
            {
              "type": "TEXT_WITH_IMAGE",
              "title": "title",
              "header": "header",
              "description": "description"
            }
          ]
        }
      },
      json: true,
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${authorization}`,
        'resourceOwnerId': process.env.APPLICATIONKEY,
        'requestUId': merchantId,
        'accept-language': 'EN',
        'channel': 'scbeasy'
      }
    }

    var res = await request(options).then(async function (response) {
      return response

    })

      .catch(function (err) {
        return err
      })
    var data = {
      merchantId: merchantId,
      transactionId: res.data.transactionId,
      deeplinkUrl: res.data.deeplinkUrl,
      userRefId: res.data.userRefId
    }
    const result = await this.deeplinkRepository.save(data);

    //console.log(result);
    return {
      code: 200,
      message: 'deeplink created',
      data: res
    };
  }
  async transactionsById(merchantId, transactionId) {
    const token = await this.token(merchantId);
    // console.log(token)
    const authorization = token.data.accessToken;
    const request = require('request-promise');
    const options = {
      method: 'GET',
      uri: `https://api.partners.scb/partners/v2/transactions/${transactionId}`,
      json: true,
      headers: {
        'authorization': `Bearer ${authorization}`,
        'resourceOwnerId': process.env.APPLICATIONKEY,
        'requestUId': merchantId,
        'accept-language': 'EN'
      }
    }

    var res = await request(options).then(async function (response) {
      return response

    })

      .catch(function (err) {
        return err
      })
    return res
  }

  async transactionList(merchantId: string) {
    try {
      const query = await this.deeplinkRepository.createQueryBuilder('it');
      query
        .select(["it"])
        .where("it.merchant_id = :merchant_id", { merchant_id: merchantId })
        .orderBy("it.date");
      const result = {
        data: await query.getRawMany(),
        count: await query.getCount()
      }

      if (result) {
        return (result)
      }
      else {
        return { message: "no transactions" }
      }
    }
    catch (err) {
      console.log('Error creating invoice', err);
      throw new InternalServerErrorException();
    }
  }

  async paymentStatus(merchantId, date, reference1, reference2) {
    const token = await this.token(merchantId);
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    var dateString = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  //  console.log(dateString);exit;

    const authorization = token.data.accessToken;
    const request = require('request-promise');
    const options = {
      method: 'GET',
      uri: `https://api.partners.scb/partners/v1/payment/billpayment/inquiry?eventCode=00300100&billerId=012355500806301&reference1=${reference1}&reference2=${reference2}&transactionDate=${dateString}`,
      json: true,
      headers: {
        'authorization': `Bearer ${authorization}`,
        'resourceOwnerId': process.env.APPLICATIONKEY,
        'requestUId': merchantId,
        'accept-language': 'EN'
      }
    }

    var res = await request(options).then(async function (response) {
      return response

    })

      .catch(function (err) {
        return err
      })
    return res
  }

  async slipVerification(merchantId, slipVerification) {
    const token = await this.token(merchantId);
    // console.log(token)
    const authorization = token.data.accessToken;
    const request = require('request-promise');
    const options = {
      method: 'GET',
      uri: `https://api.partners.scb/partners/v1/payment/billpayment/transactions/${slipVerification}?sendingBank=014`,
      json: true,
      headers: {
        'authorization': `Bearer ${authorization}`,
        'resourceOwnerId': process.env.APPLICATIONKEY,
        'requestUId': merchantId,
        'accept-language': 'EN'
      }
    }

    var res = await request(options).then(async function (response) {
      return response

    })

      .catch(function (err) {
        return err
      })
    return res
  }
  async totalAmount(merchantId: string) {
    const query = await this.sandbox30Repository.createQueryBuilder('t');
    query
      .select(["t.finalAmount"])
      .where("t.merchantId = :merchant_id", { merchant_id: merchantId })
      .orderBy("t.transaction_dateand_time");

    var res = await query.getRawMany()
    var count = await query.getCount()
    // console.log(res)
    function amount(item) {
      return item.t_final_amount;
    }
    function sum(prev, next) {
      return prev + next;
    }
    if (count) {
      var totalTransactioAmount = res.map(amount).reduce(sum);
      var TotalWithdrawAmount = await this.totalWitdrawAmount(merchantId)
      var totalamount = (totalTransactioAmount - TotalWithdrawAmount).toFixed(2)
      return totalamount
    } else {
      return 0
    }

  }

  async totalWitdrawAmount(merchantId: string) {
    try {
      const query = await this.withdrawRepository.createQueryBuilder('t');
      query
        .select(["t.amount"])
        .where("t.merchantId = :merchant_id", { merchant_id: merchantId })

      var res = await query.getRawMany()
      var count = await query.getCount()
      function amount(item) {
        return item.t_amount;
      }
      function sum(prev, next) {
        return prev + next;
      }
      if (count) {
        var totalamount = res.map(amount).reduce(sum);
        return totalamount
      } else {
        return totalamount = 0
      }

    } catch (err) {
      return err
    }
  }

  async withdrawRequest(merchantId: string, WithdrawDto) {
    try {
      var totalAmount = await this.totalAmount(merchantId)
      const details = {
        "Name": WithdrawDto.Name,
        "AccountNumber": WithdrawDto.AccountNumber,
        "IFSCcode": WithdrawDto.IFSCcode,
        "BankName": WithdrawDto.BankName
      }
      const merchant = await this.merchantRepository.findOne({ where: { merchantId: merchantId } });
      var result
      if (WithdrawDto.WithdrawlAmount <= totalAmount && WithdrawDto.WithdrawlAmount > 0) {
        const data = this.withdrawRepository.create({ merchantId: merchantId });
        data.FinalAmount = (WithdrawDto.WithdrawlAmount * (100 - merchant.withdraw) / 100)
        data.amount = WithdrawDto.WithdrawlAmount
        data.WithdrawCharges = merchant.withdraw
        // console.log(data.FinalAmount)
        data.BankDetails = details
        if (WithdrawDto.comments) data.comments = WithdrawDto.comments
        result = await this.withdrawRepository.save(data)
      }
      else {
        return { message: "amount should be <= balance and should not be 0" }
      }
      if (result) {
        return { message: "request send ", result };
      }
    }
    catch (err) {
      return err
    }
  }
  async response(sandbox30) {
    try {
      var d = await this.invoiceItemsRepository.createQueryBuilder()
        .update(Invoice)
        .set({ status: true })
        .where('reference1=:ref1', { ref1: sandbox30.billPaymentRef1 })
        .andWhere('reference2=:ref2', { ref2: sandbox30.billPaymentRef2 })
        .andWhere('status=false')
        .returning('*')
        .execute()
      if (d.affected >= 1) {
        const merchant = await this.merchantRepository.findOne({ where: { merchantId: d.raw[0].merchant_id } });
        sandbox30.merchantId = d.raw[0].merchant_id
        sandbox30.user = merchant.assignedUser
        sandbox30.finalAmount = (sandbox30.amount * (100 - merchant.transaction) / 100).toFixed(2)
        console.log(sandbox30.finalAmount)
        var result = await this.sandbox30Repository.save(sandbox30)
      }else{
        return { message: 'error while saving data' }
      }
      if (result) {
        return {
          resCode: "00",
          resDesc: "success",
          transactionId: sandbox30.transactionId,
          confirmId: sandbox30.confirmId
        }
      }
      else {
        return { message: 'error while saving data' }
      }
    }
    catch (err) {
      return err
    }
  }

  async sandboxTransactionList(merchantId: string) {
    try {
      const query = await this.sandbox30Repository.createQueryBuilder('t');
      query
        .select(["t"])
        .where("t.merchantId = :merchant_id", { merchant_id: merchantId })
        .orderBy("t.transaction_dateand_time");
      const result = {
        data: await query.getRawMany(),
        count: await query.getCount()
      }

      if (result) {
        return (result)
      }
      else {
        return { message: "no transactions" }
      }

    }
    catch (err) {
      return err
    }
  }

  async ListOfWithdrawRequest(merchantId: string){
    try{
      var data= await this.withdrawRepository.find({ where: { merchantId: merchantId } });
      if(data){
        return data
      }else{
        return {message:'no data found'}
      }

    }catch (err) {
      return err
    }
  }
  async WithdrawReqById(id) {
    const result = await this.withdrawRepository.findOne({ where: { id: id } });
    if (!result) throw new NotFoundException();
    // console.log(merchant)
    return { result }
  }

  async VoidInvoice(invoiceId,voidStatus:boolean){
    try{
     const invoice = await this.invoiceRepository.findOne({ where: { id:invoiceId } });
     if(invoice){
       if(invoice.status == true){
        return { statuscode:201,message:"This invoice is already paid,can't make it as void"}
       }
       invoice.void = voidStatus;
       await this.invoiceRepository.save(invoice)
       return {
         statuscode:200,message:"Invoice marked as void "
        }
      }else{
       return { statuscode:400,message:"Id not found"}
      }
    }
   catch(err){
     return err
    }
  }

  // async resetMail(email:string){

  //   const merchant = await this.merchantRepository.findOne({ where: { email } });
  //    if(!merchant) return { message:"Merchant does not exist" }
  //    console.log("check1")
  //    const result = await this.mailService.sendUserPasswordResetEMail(email);
  //    console.log("check2")
  //   return result;
  // }
}
