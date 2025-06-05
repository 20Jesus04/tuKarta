import { Restaurante } from 'src/restaurante/entities/restaurante.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestauranteDto } from './dto/create-restaurante.dto';
import { UpdateRestauranteDto } from './dto/update-restaurante.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class RestauranteService {
  constructor(
    @InjectRepository(Restaurante)
    private restauranteRepository: Repository<Restaurante>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(
    createRestauranteDto: CreateRestauranteDto,
  ): Promise<Restaurante> {
    const usuario = await this.usuarioRepository.findOneBy({
      id: createRestauranteDto.id_dueno,
    });
    if (!usuario) {
      throw new NotFoundException(
        `Usuario con ID ${createRestauranteDto.id_dueno} no encontrado`,
      );
    }

    const restaurante = this.restauranteRepository.create({
      ...createRestauranteDto,
      dueno: usuario,
    });

    return this.restauranteRepository.save(restaurante);
  }

  async findAll(): Promise<Restaurante[]> {
    return await this.restauranteRepository.find({
      relations: ['dueno'],
    });
  }

  async findByDueno(id_dueno: number): Promise<Restaurante> {
    const restaurante = await this.restauranteRepository.findOne({
      where: { dueno: { id: id_dueno } },
      relations: ['dueno'],
    });

    if (!restaurante) {
      throw new NotFoundException(
        `No se encontró restaurante para el dueño con id ${id_dueno}`,
      );
    }

    return restaurante;
  }
  async findOne(id: number): Promise<Restaurante> {
    const restaurante = await this.restauranteRepository.findOne({
      where: { id },
      relations: ['dueno'],
    });

    if (!restaurante) {
      throw new NotFoundException(`Restaurante con id ${id} no encontrado`);
    }

    return restaurante;
  }

  async update(
    id: number,
    updateRestauranteDto: UpdateRestauranteDto,
  ): Promise<Restaurante> {
    const restaurante = await this.restauranteRepository.findOne({
      where: { id },
      relations: ['dueno'],
    });

    if (!restaurante) {
      throw new NotFoundException(`Restaurante con ID ${id} no encontrado`);
    }

    // Actualizar solo los campos proporcionados
    if (updateRestauranteDto.nombre) {
      restaurante.nombre = updateRestauranteDto.nombre;
    }
    if (updateRestauranteDto.direccion) {
      restaurante.direccion = updateRestauranteDto.direccion;
    }
    if (updateRestauranteDto.telefono) {
      restaurante.telefono = updateRestauranteDto.telefono;
    }
    if (updateRestauranteDto.imagen_url) {
      restaurante.imagen_url = updateRestauranteDto.imagen_url;
    }

    return await this.restauranteRepository.save(restaurante);
  }

  async remove(id: number): Promise<void> {
    await this.restauranteRepository.delete(id);
  }
}
