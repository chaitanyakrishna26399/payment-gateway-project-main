import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity'
import { Deposit } from './entities/deposit.entity'

import * as bcrypt from 'bcrypt';
import { LoginUsertDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt-payload.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserDepositDto } from './dto/user-deposite.dto';
import { asyncScheduler, elementAt } from 'rxjs';
import { CreateInvoiceDto } from 'src/merchant/dto/create-invoice.dto';
import { Invoice } from 'src/merchant/entities/invoice.entity';
import { InvoiceItems } from 'src/merchant/entities/invoice-items.entity';
import { InvoiceItemsDto } from 'src/merchant/dto/invoice-items.dto';
import { PaymentDto } from 'src/merchant/dto/payment.dto';
import { Payment } from 'src/merchant/entities/payment.entity';
import { ProfileDto } from './dto/profile.dto';
import { ResetPasswordDto } from './dto/reset-password-dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Deposit) private depositRepository: Repository<Deposit>,
    @InjectRepository(Invoice) private invoiceRepository: Repository<Invoice>,
    @InjectRepository(InvoiceItems) private invoiceItemsRepository: Repository<InvoiceItems>,
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
    private jwtService: JwtService,
  ) { }

  //register
  async create(createUsertDto: CreateUserDto) {
    const email = createUsertDto.email;
    console.log(email);
    const [findUser] = await this.userRepository.find({ where: { email } });
    if (!findUser) {
      try {
        const user = this.userRepository.create(createUsertDto);
        await this.userRepository.save(user);
        return { message: "registered successfully", user };
      } catch (err) {
        console.log('Error creating user', err);
        throw new InternalServerErrorException();
      }
    } else {
      return { message: "Email already exist" }
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
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException();
    return user;
  }
  async validateUserPassword(email: string, password: string) {
    const user = await this.findOne(email);

    if (!user)
      throw new HttpException(
        'Email or Password is incorrect',
        HttpStatus.NOT_FOUND,
      );

    const passIsCorrect = await this.checkPassword(password, user.password);
    if (user && passIsCorrect) return user;
    else
      throw new HttpException(
        'Username or password incorrect',
        HttpStatus.BAD_REQUEST,
      );
  }


  //login
  async login(loginUserDto: LoginUsertDto) {
    const { email, password } = loginUserDto;
    const result = await this.validateUserPassword(email, password);
    const payload: JwtPayload = { email: result.email, isUser: true };
    console.log('payload', payload);
    const accessToken = this.jwtService.sign(payload);
    console.log('access token', accessToken);
    //  const {confirmPassword, ...others} = result

    return { code: 200, message: "Login success", accessToken };
  }

  //update user
  async updateUser(email: string, updateUserDto: UpdateUserDto) {
    const { newPassword, newEmail, newName } = updateUserDto;
    const user = await this.findOne(email);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    if (newPassword) user.password = newPassword;
    if (newEmail) user.email = newEmail;
    if (newName) user.name = newName;

    await this.userRepository.save(user);
    return { code: 201, message: 'Password updated' };
  }

  //find a user
  async findUserProfile(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException();
    return { message: "success", user };
  }

  //update password
  async updatePassword(email: string, updatePasswordDto: UpdatePasswordDto) {
    const { newPassword } = updatePasswordDto;
    const user = await this.findOne(email);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    if (newPassword) user.password = newPassword;

    await this.userRepository.save(user);
    return { code: 201, message: 'Password updated' };
  }

  // async createUserDeposite(CreateUserDepositeDto:CreateUserDepositeDto){
  //   try{
  //     const deposite = this.userRepository.create(CreateUserDepositeDto);
  //     await this.userRepository.save(deposite)
  //     return deposite;
  //   } catch{
  //     throw new InternalServerErrorException();

  //   }
  // }

  async depositToWallet(userdepositDto: UserDepositDto) {
    const { userId, amount } = userdepositDto;
    //const user = await this.findOne(email);
    const deposit = new Deposit()
    deposit.userId = userId,
      deposit.orderId = 139872658,
      deposit.transactionId = 'tran93817801',
      deposit.transType = "wallet",
      deposit.status = "success",
      deposit.amount = amount,

      await this.depositRepository.save(deposit);
    return { code: 201, message: 'Added to wallet' };
  }

  async updateProfile(email: string, updateProfileDto: ProfileDto) {
    const {
      userName,
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
      pincode,
      shopType,
      mobilePayment,
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
      bankTransfer
    } = updateProfileDto;
    const user = await this.findOne(email);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    if (userName) user.userName = userName;
    if (entityType) user.personType = entityType;
    if (InitialShop) user.InitialShop = InitialShop;
    if (firstName) user.firstName = firstName;
    if (surName) user.surName = surName;
    if (yearOfBirth) user.yearOfBirth = yearOfBirth;
    if (monthOfBirth) user.monthOfBirth = monthOfBirth;
    if (dayOfBirth) user.dayOfBirth = dayOfBirth;
    if (mobile) user.mobile = mobile;
    if (address) user.address = address;
    if (province) user.province = province;
    if (district) user.district = district;
    if (subDivision) user.subDivision = subDivision;
    if (pincode) user.pincode = pincode;
    if (shopType) user.shopType = shopType;
    if (mobilePayment) {
      user.mobilePayment = true;
    }
    else {
      user.mobilePayment = false;
    }
    if (bankTransfer) {
      user.bankTransfer = true;
    }
    else {
      user.bankTransfer = false;
    }
    if (website) user.website = website;
    if (facebook) user.facebook = facebook;
    if (linkedin) user.linkedin = linkedin;
    if (instagram) user.instagram = instagram;
    if (company) user.company = company;
    if (bank) user.bank = bank;
    if (bankAccount) user.bankAccount = bankAccount;
    if (rnfCode) user.rnfCode = rnfCode;
    if (domestic) user.domestic = domestic;
    if (inter) user.inter = inter;
    if (rateQrCode) user.rateQrCode = rateQrCode;
    if (rateBarCode) user.rateBarCode = rateBarCode;
    if (copyOfId) user.copyOfId = copyOfId;
    if (logo) user.logo = logo;
    if (bankBook) user.bankBook = bankBook;
    if (otherDocument) user.otherDocument = otherDocument;
    //const userProfile = this.userRepository.create(updateProfileDto);
    console.log(user);
    const result = await this.userRepository.save(user);
    return { code: 201, message: 'Updated successfully' };
  }

  async resetPassword(email: string, resetPasswordDto: ResetPasswordDto) {
    const { oldPassword, newPassword } = resetPasswordDto;
    const user = await this.findOne(email);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const passIsCorrect = await this.checkPassword(oldPassword, user.password);
    if (user && passIsCorrect) {
      if (newPassword) user.password = newPassword;
      await this.userRepository.save(user);
      return { code: 200, message: "Updated Successfully" };
    }
    else {
      return { message: "Old password is wrong,try again" };
    }
  }

  async ListOfInvoice(useremail) {
    try {
      var date2 = new Date()
      var d = date2.getDate();
      var m = date2.getMonth() + 1;
      var y = date2.getFullYear();
      var h = date2.getHours();
      var mm = date2.getMinutes();
      var ss = date2.getSeconds();
      var dateString = y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d) + ' ' + (h <= 9 ? '0' + h : h) + ':' + (mm <= 9 ? '0' + mm : mm) + ':' + (ss <= 9 ? '0' + ss : ss);
      var invoice = await this.invoiceRepository.createQueryBuilder('t')
        .where("t.billTo= :BillTo", { BillTo: useremail })
        .andWhere("t.expirydate>:dateString", { dateString: dateString })
        .andWhere("t.status=:status", { status: false })
        .andWhere("t.void = false")

      var pending
      if (await invoice.getCount() >= 1) {
        pending = await invoice.getRawMany()
      } else {
        pending = 0
      }
      var invoice1 = await this.invoiceRepository.createQueryBuilder('t')
        .where("t.billTo= :BillTo", { BillTo: useremail })
        .andWhere("t.status=:status", { status: true })
        .andWhere("t.void = false")

      var paid
      if (await invoice1.getCount() >= 1) {
        paid = await invoice1.getRawMany()
      } else {
        paid = 0
      }
      var invoice2 = await this.invoiceRepository.createQueryBuilder('t')
        .where("t.billTo= :BillTo", { BillTo: useremail })
        .andWhere("t.expirydate<:dateString", { dateString: dateString })
        .andWhere("t.status=:status", { status: false })
        .andWhere("t.void = false")
      var expired
      if (await invoice2.getCount() >= 1) {
        expired = await invoice2.getRawMany()
      } else {
        expired = 0
      }
      return { pending, paid, expired }
      // var invoice = await this.invoiceRepository.find({ where: { billTo: useremail } })
      // if(invoice.length>=1){
      // return invoice
      // }
      // else{
      //   return {message:'No invoices found'}
      // }
    } catch (err) {
      return err
    }
  }

  async getTotalAmount(email: string) {
    try {
      var invoice = await this.invoiceRepository.createQueryBuilder('t')
        .where("t.billTo= :BillTo", { BillTo: email })
        .andWhere("t.status=:status", { status: true })
        .andWhere("t.void = false")
        

        function amount(item) {
          return item.t_totalamount;
        }
        function sum(prev, next) {
          return prev + next;
        }
      if (await invoice.getCount() >= 1) {
        let list= await invoice.getRawMany()
        var total = list.map(amount).reduce(sum)
        return { code: 200, TotalPaid:total}
      } else {
        return { code: 200, TotalPaid:0};
      }
    } catch (err) {
      return err
    }
  }
}
