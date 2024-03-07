import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthErrors } from 'src/common/domain-errors/auth.errors';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  validate(username: string, password: string) {
    console.log('strategy');
    
    const userOrNull = this.authService.validateUser({ username, password });

    if(!userOrNull) throw new UnauthorizedException(AuthErrors.InvalidCredentials)

    return userOrNull
  }
}
