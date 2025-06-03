import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  create(createUsuarioDto: CreateUsuarioDto) {
    return `This action adds a new usuario ${createUsuarioDto.nombre}`;
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  async update(id: number, dto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    // Verificar si el nuevo email ya existe y es diferente al actual
    if (dto.email && dto.email !== usuario.email) {
      const emailExistente = await this.usuarioRepository.findOne({
        where: { email: dto.email },
      });
      if (emailExistente) {
        throw new ConflictException('Ese email ya está en uso');
      }
      usuario.email = dto.email;
    }

    // Cambiar nombre si viene
    if (dto.nombre) {
      usuario.nombre = dto.nombre;
    }

    // Si se proporciona una nueva contraseña, verificar que venga también la antigua
    if (dto.password && dto.passwordAntigua) {
      const esCorrecta = await bcrypt.compare(
        dto.passwordAntigua,
        usuario.password,
      );
      if (!esCorrecta) {
        throw new UnauthorizedException('La contraseña actual es incorrecta');
      }
      const nuevaHash = await bcrypt.hash(dto.password, 10);
      usuario.password = nuevaHash;
    } else if (dto.password || dto.passwordAntigua) {
      throw new BadRequestException(
        'Debes proporcionar tanto la contraseña actual como la nueva',
      );
    }

    return await this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
