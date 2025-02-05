import { Module, forwardRef } from '@nestjs/common';

import { UsuarioModule } from '../usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants/constants';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './estrategy/local.strategy';
import { Bcrypt } from './bcrypt/bcrypt';
import { JwtStrategy } from './estrategy/jwt.strategy';




@Module({
  imports: [
    forwardRef(() => UsuarioModule), // 🔹 Certifica que UsuarioModule pode usar AuthModule
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [Bcrypt, AuthService, LocalStrategy,JwtStrategy],
  exports: [AuthService, Bcrypt], // 🔹 Exporte AuthService para ser usado no UsuarioModule
})
export class AuthModule {}
