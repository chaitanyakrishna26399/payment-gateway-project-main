import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { JwtPayload } from './interface/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangeEmailDto } from './dto/change-email.dto';
import { ChangeNameDto } from './dto/change-name.dto';
import { Assign } from './entities/assign.entity';
import { AssignDto } from './dto/assign.dto';
import { Merchant } from 'src/merchant/entities/merchant.entity';
import { User } from 'src/user/entities/user.entity';
import { AdminProfileDto } from './dto/admin-profile.dto';
import { concat } from 'rxjs';
import { withdrawRequest } from 'src/merchant/entities/withdraw-Request.entity';
import { Sandbox30 } from 'src/merchant/entities/Sandbox30.entity';


@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    @InjectRepository(Assign) private assignRepository: Repository<Assign>,
    @InjectRepository(Merchant) private merchantRepository: Repository<Merchant>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(withdrawRequest) private withdrawRepository: Repository<withdrawRequest>,
    @InjectRepository(Sandbox30) private sandbox30Repository: Repository<Sandbox30>,



    private jwtService: JwtService,
  ) { }
  async create(createAdminDto: CreateAdminDto) {
    try {
      const admin = this.adminRepository.create(createAdminDto);
      await this.adminRepository.save(admin);
      return { message: "registered successfully", admin };
    } catch (err) {
      console.log('Error creating admin', err);
      throw new InternalServerErrorException();
    }
  }

  async findOne(email: string) {
    const admin = await this.adminRepository.findOne({ where: { email } });
    if (!admin) throw new NotFoundException();
    return admin;
  }

  async validateUserPassword(email: string, password: string) {
    const admin = await this.findOne(email);

    if (!admin)
      throw new HttpException(
        'Email or Password is incorrect',
        HttpStatus.NOT_FOUND,
      );

    const passIsCorrect = await this.checkPassword(password, admin.password);
    if (admin && passIsCorrect) return admin;
    else
      throw new HttpException(
        'Username or password incorrect',
        HttpStatus.BAD_REQUEST,
      );
  }

  private async checkPassword(
    pass: string,
    hashedPass: string,
  ): Promise<boolean> {
    const isPassMatch = await bcrypt.compare(pass, hashedPass);
    if (!isPassMatch) return false;
    return true;
  }

  async login(loginAdminDto: LoginAdminDto) {
    const { email, password } = loginAdminDto;
    const result = await this.validateUserPassword(email, password);
    const payload = { email: result.email, isAdmin: true };
    console.log('payload', payload);
    const accessToken = this.jwtService.sign(payload);
    console.log("check");
    return { code: 200, message: "Login successfull", accessToken };
  }
  async updateAdmin(email: string, updateAdminDto: UpdateAdminDto) {
    const { newPassword, newEmail, newName } = updateAdminDto;
    const admin = await this.findOne(email);
    if (!admin) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    if (newPassword) admin.password = newPassword;
    if (newEmail) admin.email = newEmail;
    if (newName) admin.name = newName;

    await this.adminRepository.save(admin);
    return { code: 201, message: 'Password updated' };
  }

  async updateProfile(email: string, updateAdminDto: AdminProfileDto) {
    const { userName, surName, mobile, address, province, district, subdistrict, pincode } = updateAdminDto;
    const admin = await this.findOne(email);
    if (!admin) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    if (userName) admin.name = userName;
    if (surName) admin.surName = surName;
    if (mobile) admin.mobile = mobile;
    if (address) admin.address = address;
    if (province) admin.province = province;
    if (district) admin.district = district;
    if (subdistrict) admin.subdistrict = subdistrict;
    if (pincode) admin.pincode = pincode;

    await this.adminRepository.save(admin);
    return { code: 201, message: 'Updated successfully' };
  }

  async findAdminProfile(email: string) {
    const admin = await this.adminRepository.findOne({ where: { email } });
    if (!admin) throw new NotFoundException();
    return { message: "success", admin };
  }

  async updatePassword(email: string, updatePasswordDto: UpdatePasswordDto) {
    const { newPassword } = updatePasswordDto;
    const admin = await this.findOne(email);
    if (!admin) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (newPassword) admin.password = newPassword;
    await this.adminRepository.save(admin);
    return { code: 201, message: 'Password updated' };
  }

  async checkMerchnetNotAssigned(array) {
    try {
      for (let i = 0; i < array.length; i++) {
        var email = array[i]
        var data = await this.merchantRepository.findOne({ where: { email } });
        if (data.assignedUser != null) {
          return false
        }
      }
      return true
    }
    catch (err) {
      return err
    }
  }
  async addingMerchnttouser(array, user) {
    try {
      for (let i = 0; i < array.length; i++) {
        var email = array[i]
        var data = await this.merchantRepository.findOne({ where: { email } });
        if (user) data.assignedUser = user;
        await this.merchantRepository.save(data);
      }
      return true
    }
    catch (err) {
      return err
    }
  }

  async assign(assignDto: AssignDto) {
    try {
      var email = assignDto.userEmail
      const finduser = await this.userRepository.findOne({ where: { email } });
      // console.log(finduser);
      var check = await this.checkMerchnetNotAssigned(assignDto.merchantEmail)
      // console.log(finduser.length)
      if (check) {
        if (finduser) {
          if (finduser.merchantEmail == null) {
            const newmerchantEmail = assignDto.merchantEmail;
            if (newmerchantEmail) finduser.merchantEmail = newmerchantEmail;
            await this.addingMerchnttouser(assignDto.merchantEmail, assignDto.userEmail)
            var assign = await this.userRepository.save(finduser);
            return assign;
          } else {

            var newmerchantEmail = finduser.merchantEmail.concat(assignDto.merchantEmail)
            if (newmerchantEmail) finduser.merchantEmail = newmerchantEmail;
            // console.log(finduser)
            await this.addingMerchnttouser(assignDto.merchantEmail, assignDto.userEmail)
            var assign = await this.userRepository.save(finduser);
            return {statuscode:200,message:"Assigned Successfully",assign};
          }
        } else {
          return { message: "Invalid user" }
        }
      } else {
        return { message: 'merchant already assigned to another user' }
      }
    } catch (err) {
      console.log('Error assigning merchant', err);
      throw new InternalServerErrorException();
    }
  }

  async findMerchant() {
    const merchant = await this.merchantRepository.find();
    if (!merchant) throw new NotFoundException();
    return merchant;
  }

  async findMerchantById(merchantId: string) {
    const merchant = await this.merchantRepository.findOne({ where: { merchantId: merchantId } });
    if (!merchant) throw new NotFoundException();
    return { merchant };
  }

  async findUser() {
    const user = await this.userRepository.find();
    if (!user) throw new NotFoundException();
    return user;
  }
  async remove(email: string) {
    const [user] = await this.userRepository.find({ where: { email } });
    await this.userRepository.delete(user.id);
    return { message: "User deleted by admin" };
  }

  async WithdrawReq() {
    const result = await this.withdrawRepository.find();
    if (!result) throw new NotFoundException();
    return result

  }

  async WithdrawReqById(id) {
    const result = await this.withdrawRepository.findOne({ where: { id: id } });
    if (!result) throw new NotFoundException();
    const merchant = await this.merchantRepository.findOne({ where: { merchantId: result.merchantId } })
    // console.log(merchant)
    return { result, merchant }
  }

  async PaymentStatus(ReferenceId, PaymentStatus) {
    if(PaymentStatus == false){
      return {statuscode:200,message:"Pending"}
    }
    try {
      var result = await this.withdrawRepository.createQueryBuilder()
        .update(withdrawRequest)
        .set({ status: true})
        .where('ReferalNumber=:ref', { ref: ReferenceId })
        .andWhere('status=false')
        .returning('*')
        .execute()

      if (result.affected >= 1) {
        return {statuscode:200, message:"success",result};
      }
      else{
        return{statuscode:201,message:'Request already processed'}
      }
    }
    catch (err) {
      return {statuscode:400,message:"Id not found"}
    }
  }

  async FeesById(merchantId: string, feesdto) {
    try {
      const merchant = await this.merchantRepository.findOne({ where: { merchantId: merchantId } })
      merchant.transaction = feesdto.TransactionFee;
      merchant.withdraw = feesdto.withdrawFee
      var result = await this.merchantRepository.save(merchant)
      if (result) {
        return "fees added"
      }
      else {
        return "unable to add fees"
      }
    }
    catch (err) {
      return err
    }

  }
  async sandboxTransactionList() {
    try {
      const result = await this.sandbox30Repository.find();
      if (result) {
        return (result)
      }
      else {
        return { message: "No Transactions Found" }
      }
    }
    catch (err) {
      return { message:"failed to fetch"}
    }
  }

  async TotalCount() {
    try {
      const user = await this.userRepository.count();
      if (!user) throw new NotFoundException();
      const merchant = await this.merchantRepository.count();
      if (!merchant) throw new NotFoundException();
      const Total_paid = await this.withdrawRepository.find({ status: true });
      if (!Total_paid) throw new NotFoundException();
      let Total_paid_WithdrawAmount=0
      Total_paid.forEach(s=>{
        Total_paid_WithdrawAmount+=s.FinalAmount
      })
      const Total_panding = await this.withdrawRepository.find({ status: false });
      if (!Total_panding) throw new NotFoundException();
      let Total_panding_WithdrawAmount=0
      Total_panding.forEach(s=>{
        Total_panding_WithdrawAmount+=s.FinalAmount
      })
      return {
        Total_paid_WithdrawAmount:Total_paid_WithdrawAmount,
        Total_pending_WithdrawAmount:Total_panding_WithdrawAmount,
        users_count: user,
        merchant_count: merchant
      }
    } catch (err) {
      return {message:"Failed to fetch"}
    }

  }

}
