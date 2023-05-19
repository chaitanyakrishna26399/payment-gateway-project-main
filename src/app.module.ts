import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MerchantModule } from './merchant/merchant.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    AdminModule,
    MerchantModule,
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    UserModule,
    
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
