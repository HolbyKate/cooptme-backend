import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  async validateToken(token: string): Promise<boolean> {
    try {
      const auth0Domain = this.configService.get<string>('AUTH0_DOMAIN');
      const response = await axios.get(`https://${auth0Domain}/userinfo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return !!response.data;
    } catch (error) {
      throw new UnauthorizedException('Token invalide');
    }
  }
}
