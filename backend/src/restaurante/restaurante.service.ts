import { Restaurante } from 'src/restaurante/entities/restaurante.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestauranteDto } from './dto/create-restaurante.dto';
import { UpdateRestauranteDto } from './dto/update-restaurante.dto';

@Injectable()
export class RestauranteService {
  constructor(
    @InjectRepository(Restaurante)
    private restauranteRepository: Repository<Restaurante>,
  ) {}

  async create(
    createRestauranteDto: CreateRestauranteDto,
  ): Promise<Restaurante> {
    const restaurante = this.restauranteRepository.create(createRestauranteDto);
    return await this.restauranteRepository.save(restaurante);
  }

  async findAll(): Promise<Restaurante[]> {
    return await this.restauranteRepository.find({
      relations: ['dueno'],
    });
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
    await this.restauranteRepository.update(id, updateRestauranteDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.restauranteRepository.delete(id);
  }
}
