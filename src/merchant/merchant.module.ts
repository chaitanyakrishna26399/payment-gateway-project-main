import { Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Merchant } from './entities/merchant.entity';
import { Invoice } from './entities/invoice.entity';
import { InvoiceItems } from './entities/invoice-items.entity';
import { Payment } from './entities/payment.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Qrcode } from './entities/qrcode.entity';
import { DeepLink } from './entities/depplink.entity';
import { withdrawRequest } from './entities/withdraw-Request.entity';
import { Sandbox30 } from './entities/Sandbox30.entity';
//import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
//import { MailService } from './mail/mail.service';

@Module({
  //providers: [MerchantService,MailService],
  providers: [MerchantService],
  controllers: [MerchantController],
  imports: [
    TypeOrmModule.forFeature([Merchant]),
    TypeOrmModule.forFeature([Invoice]),
    TypeOrmModule.forFeature([InvoiceItems]),
    TypeOrmModule.forFeature([Payment]),
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

    // MailerModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     transport: {
    //       host: 'smtp.gmail.com',
    //       secure: false,
    //       auth: {
    //         user:process.env.MAIL_USERNAME,
    //         pass:process.env.MAIL_PASSWORD
    //       },
    //     },
    //     template: {
    //       dir: join(__dirname, '/templates'),
    //      // adapter: new HandlebarsAdapter,
    //       options: {
    //         strict: true,
    //       },
    //     },
    //   }),
    // }),

  ],
})
export class MerchantModule { }
