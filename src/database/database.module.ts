import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
        }),
      ],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        // host: configService.get<string>('DATABASE_HOST'),
        // database: configService.get<string>('DATABASE_NAME'),
        // port: configService.get<number>('DATABASE_PORT'),
        // username: configService.get<string>('DATABASE_USERNAME'),
        // password: configService.get<string>('DATABASE_PASSWORD'),
        entities: ['dist/**/*.entity{.ts,.js}'],
         namingStrategy: new SnakeNamingStrategy(),
         synchronize: true,
        //url: process.env.DATABASE_URL,
         url: 'postgres://gjcbrhvxzmjesd:d1372e83a5f524d84ee4464c984c8619979b2651c3640948c683dda02ddbf228@ec2-44-209-186-51.compute-1.amazonaws.com:5432/d6g4qrk0cfutrf',
         ssl: {
           rejectUnauthorized: false,
         },
      }),
    }),
  ],
})
export class DatabaseModule {}
