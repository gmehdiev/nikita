import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(6)
  login: string;

  @IsString()
  @MinLength(6)
  password: string;
}
