import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(
    login: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = {
      login,
      password,
    };

    return this.generateTokens(payload);
  }

  refreshToken(token: string) {
    return this.jwtService.decode(token);
  }
  private async generateTokens(payload) {
    const accessToken =
      `Bearer ` +
      this.jwtService.sign(
        {
          ...payload,
        },
        {
          expiresIn: '30m',
          secret: 'skibidi',
        },
      );

    const refreshToken = this.jwtService.sign(
      {
        ...payload,
      },
      {
        expiresIn: '30d',
        secret: 'skibidiToilet',
      },
    );

    return { accessToken, refreshToken };
  }
}
