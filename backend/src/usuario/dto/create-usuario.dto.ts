import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { RolUsuario } from '../entities/usuario.entity';

export class CreateUsuarioDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  nombre: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEmail()
  email: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @MinLength(6)
  password: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEnum(RolUsuario)
  rol: RolUsuario;
}
