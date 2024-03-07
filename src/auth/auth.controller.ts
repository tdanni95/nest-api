import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('register')
  register(@Body() credentials: RegisterDto){
    return this.authService.registerUser(credentials)
  }

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() request: Request) {
    //localstrategy értékét kapja meg
    return request.user
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() request: Request){
    console.log("in auth controller status method");
    return request.user
  }
}
