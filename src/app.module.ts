import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './common/typeorm/entities/user.entity';


@Module({
  imports: [
    AuthModule, 
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async(configService: ConfigService) => ({
        type: "mysql",
        host: configService.getOrThrow('DATABASE_HOST'),
        port: configService.getOrThrow('DATABASE_PORT'),
        username: configService.getOrThrow('DATABASE_USERNAME'),
        password: configService.getOrThrow('DATABASE_PASSWORD'),
        database: configService.getOrThrow('DATABASE_NAME'),
        entities: [UserEntity],
        synchronize: true
      })
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
