import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Assign } from './entities/assign.entity';
import { Merchant } from 'src/merchant/entities/merchant.entity';
import { MerchantService } from 'src/merchant/merchant.service';
import { Invoice } from 'src/merchant/entities/invoice.entity';
import { InvoiceItems } from 'src/merchant/entities/invoice-items.entity';
import { Payment } from 'src/merchant/entities/payment.entity';
import { User } from 'src/user/entities/user.entity';
import { Qrcode } from 'src/merchant/entities/qrcode.entity';
import { DeepLink } from 'src/merchant/entities/depplink.entity';
import { withdrawRequest } from 'src/merchant/entities/withdraw-Request.entity';
import { Sandbox30 } from 'src/merchant/entities/Sandbox30.entity';
//import { MailService } from 'src/merchant/mail/mail.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    TypeOrmModule.forFeature([Assign]),
    TypeOrmModule.forFeature([Merchant]),
    TypeOrmModule.forFeature([Invoice]),
    TypeOrmModule.forFeature([InvoiceItems]),
    TypeOrmModule.forFeature([Payment]),
    TypeOrmModule.forFeature([User]),
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
  controllers: [AdminController],
  providers: [AdminService,MerchantService],
})
export class AdminModule {}
