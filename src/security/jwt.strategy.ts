import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { ExtractJwt, Strategy } from 'passport-jwt';
dotenv.config();
const secret =
  '404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970ARN304N39FR3NRF44' as string;
@Injectable()
export class JWTStartegy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret
    });
  }
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.userEmail};
  }

}