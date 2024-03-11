import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthErrors } from 'src/common/domain-errors/auth.errors';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/common/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TokenPayload } from './token-payload';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 10;
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async registerUser({ username, password }: RegisterDto) {
    const isUsernameTaken =
      await this.findUserByUsernameCaseInsenstivve(username);

    if (isUsernameTaken)
      throw new UnauthorizedException(AuthErrors.UsernameTaken);

    username = username.toLowerCase();

    const newPassword = await this.hashPassword(password);

    const user = { username, password: newPassword };
    try {
      const result = await this.userRepository.save(user);
      return { id: result.id, username };
    } catch (error) {
      console.error('Insert failed: ', error);
      throw new Error('Failed to register');
    }
  }

  async validateUser({ username, password }: LoginDto) {
    const findUser = await this.findUserByUsernameCaseInsenstivve(username);
    if (!findUser)
      throw new UnauthorizedException(AuthErrors.InvalidCredentials);

    const isPasswordCorredt = await bcrypt.compare(password, findUser.password);

    if (!isPasswordCorredt)
      throw new UnauthorizedException(AuthErrors.InvalidCredentials);

    const tokenPayload: TokenPayload = {
      id: findUser.id,
      username: findUser.username,
    };
    return { token: this.jwtService.sign(tokenPayload) };
  }

  private async findUserByUsernameCaseInsenstivve(username: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('LOWER(user.username) = LOWER(:username)', { username })
      .getOne();
  }

  private async hashPassword(password: string) {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }
}
