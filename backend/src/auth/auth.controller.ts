import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from '../usuario/dto/create-usuario.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: CreateUsuarioDto) {
    const nuevoUsuario = await this.authService.register(dto);
    return nuevoUsuario;
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('recuperar')
  async solicitarRecuperacion(@Body('email') email: string) {
    return this.authService.iniciarRecuperacionPassword(email);
  }

  @Post('restablecer')
  async restablecerPassword(
    @Body('token') token: string,
    @Body('nuevaPassword') nuevaPassword: string,
  ) {
    return this.authService.restablecerPassword(token, nuevaPassword);
  }
}
