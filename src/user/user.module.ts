import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Deposit } from './entities/deposit.entity';
import { MerchantService } from 'src/merchant/merchant.service';
import { Payment } from 'src/merchant/entities/payment.entity';
import { InvoiceItems } from 'src/merchant/entities/invoice-items.entity';
import { Invoice } from 'src/merchant/entities/invoice.entity';
import { Merchant } from 'src/merchant/entities/merchant.entity';
import { Qrcode } from 'src/merchant/entities/qrcode.entity';
import { DeepLink } from 'src/merchant/entities/depplink.entity';
import { withdrawRequest } from 'src/merchant/entities/withdraw-Request.entity';
import { Sandbox30 } from 'src/merchant/entities/Sandbox30.entity';
//import { MailService } from 'src/merchant/mail/mail.service';



@Module({
  providers: [UserService,MerchantService],
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Deposit]),
    TypeOrmModule.forFeature([Payment]),
    TypeOrmModule.forFeature([Invoice]),
    TypeOrmModule.forFeature([InvoiceItems]),
    TypeOrmModule.forFeature([Merchant]),
    TypeOrmModule.forFeature([Qrcode]),
    TypeOrmModule.forFeature([DeepLink]),
    TypeOrmModule.forFeature([withdrawRequest]),
    TypeOrmModule.forFeature([Sandbox30]),

    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '24h',
      },
    }),
    
    
  ],
})
export class UserModule {}
