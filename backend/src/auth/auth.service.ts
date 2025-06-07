import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { Usuario } from '../usuario/entities/usuario.entity';
import { CreateUsuarioDto } from '../usuario/dto/create-usuario.dto';
import { LoginDto } from './dto/login.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateUsuarioDto) {
    console.log(' Datos recibidos en registro:', dto);
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

  async iniciarRecuperacionPassword(email: string) {
    const usuario = await this.usuarioRepository.findOne({ where: { email } });

    if (!usuario) {
      throw new NotFoundException('No se encontró un usuario con ese email');
    }

    const token = randomBytes(32).toString('hex');
    const expiracion = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    usuario.tokenRecuperacion = token;
    usuario.tokenExpiracion = expiracion;

    await this.usuarioRepository.save(usuario);

    // ✅ AHORA SÍ: Enviamos el correo
    await this.enviarCorreoRecuperacion(email, token);

    return {
      mensaje:
        'Revisa tu correo para continuar con la recuperación de contraseña.',
    };
  }

  async restablecerPassword(token: string, nuevaPassword: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { tokenRecuperacion: token },
    });

    if (
      !usuario ||
      !usuario.tokenExpiracion ||
      usuario.tokenExpiracion < new Date()
    ) {
      throw new UnauthorizedException('El token no es válido o ha expirado');
    }

    const hash = await bcrypt.hash(nuevaPassword, 10);
    usuario.password = hash;
    usuario.tokenRecuperacion = null;
    usuario.tokenExpiracion = null;

    await this.usuarioRepository.save(usuario);

    return { mensaje: 'La contraseña ha sido restablecida correctamente' };
  }

  private async enviarCorreoRecuperacion(
    email: string,
    token: string,
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const enlace = `https://tukarta.vercel.app/restablecer-password/${token}`;

    const mailOptions = {
      from: `TuKarta <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Recupera tu contraseña - TuKarta',
      html: `
      <div style="font-family: sans-serif;">
        <h2>Solicitud de recuperación de contraseña</h2>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña. Este enlace es válido por 1 hora:</p>
        <a href="${enlace}" style="display:inline-block; padding:10px 20px; background-color:#ff6600; color:white; text-decoration:none; border-radius:5px;">
          Restablecer contraseña
        </a>
        <p style="margin-top:20px;">Si no has solicitado esto, simplemente ignora este correo.</p>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);
  }
}
