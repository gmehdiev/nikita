import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { Cookie } from '@app/./decorator/cookies.decorator';
import { Public } from '@app/./decorator/publick.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: LoginDto, @Res() res: Response) {
    const tokens = await this.authService.signIn(dto.login, dto.password);
    this.setRefreshTokenToCookies(tokens.refreshToken, tokens.accessToken, res);
  }

  @Post('login')
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const tokens = await this.authService.signIn(dto.login, dto.password);
    this.setRefreshTokenToCookies(tokens.refreshToken, tokens.accessToken, res);
  }

  @Get('refresh')
  async refresh(
    @Cookie('refreshToken') refreshToken: string,
    @Res() res: Response,
  ) {
    if (!refreshToken) {
      throw new UnauthorizedException('не авторизован');
    }
    const payload = this.authService.refreshToken(refreshToken);
    const tokens = await this.authService.signIn(
      payload.login,
      payload.password,
    );
    this.setRefreshTokenToCookies(tokens.refreshToken, tokens.accessToken, res);
  }

  @Get('logout')
  async logout(
    @Cookie('refreshToken') refreshToken: string,
    @Res() res: Response,
  ) {
    if (!refreshToken) {
      res.sendStatus(HttpStatus.OK);
      return;
    }
    console.log(refreshToken);
    res.cookie('refreshToken', '', {
      httpOnly: true,
      secure: true,
    });
    res.sendStatus(HttpStatus.OK);
  }

  private setRefreshTokenToCookies(
    refreshToken: string,
    accessToken: string,
    res: Response,
  ) {
    if (!refreshToken && !accessToken) {
      throw new UnauthorizedException();
    }
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 2592000000,
      path: '/',
    });
    res.status(HttpStatus.CREATED).json({ accessToken });
  }
}
