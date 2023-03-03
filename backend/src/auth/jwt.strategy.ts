/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common/decorators';
import { jwtConstants } from './constans';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // method by which Jwt will be extracted from the request
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Denied expire Jwt token 
      ignoreExpiration: false,
      // secret key
      secretOrKey: jwtConstants.secret,
    });
  }
  
  async validate(payload : any) {
    return {userId: payload.sub, username: payload.username}
  }
}
