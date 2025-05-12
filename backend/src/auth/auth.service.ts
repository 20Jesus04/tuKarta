import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Usuario } from '../usuario/entities/usuario.entity';
import { CreateUsuarioDto } from '../usuario/dto/create-usuario.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateUsuarioDto) {
    console.log('📦 Datos recibidos en registro:', dto);
    const existe = await this.usuarioRepository.findOne({
      where: { email: dto.email },
    });
    if (existe) {
      throw new ConflictException('El correo ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const nuevoUsuario = this.usuarioRepository.create({
      ...dto,
      password: hashedPassword,
    });
    await this.usuarioRepository.save(nuevoUsuario);

    return nuevoUsuario;
  }

  async login(dto: LoginDto) {
    const usuario = await this.usuarioRepository.findOne({
      where: { email: dto.email },
    });
    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const passwordOK = await bcrypt.compare(dto.password, usuario.password);
    if (!passwordOK) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
    };

    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    };
  }
}
