import { IsStrongPassword, Matches } from "class-validator"

export class RegisterDto {
    @Matches(/^[A-Za-z0-9_]+$/, {
        message: 'username can only contain letters, numbers, and underscores',
      })
    username: string

    @IsStrongPassword()
    password: string
}
