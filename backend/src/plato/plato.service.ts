import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlatoDto } from './dto/create-plato.dto';
import { UpdatePlatoDto } from './dto/update-plato.dto';
import { Plato } from './entities/plato.entity';
import { Categoria } from 'src/categoria/entities/categoria.entity';

@Injectable()
export class PlatoService {
  constructor(
    @InjectRepository(Plato)
    private readonly platoRepository: Repository<Plato>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createPlatoDto: CreatePlatoDto) {
    const categoria = await this.categoriaRepository.findOne({
      where: { id: createPlatoDto.id_categoria },
    });

    if (!categoria) {
      throw new NotFoundException(
        `Categoria con ID ${createPlatoDto.id_categoria} no encontrada`,
      );
    }

    const nuevoPlato = this.platoRepository.create({
      nombre: createPlatoDto.nombre,
      descripcion: createPlatoDto.descripcion,
      precio: createPlatoDto.precio,
      id_categoria: categoria,
    });

    return this.platoRepository.save(nuevoPlato);
  }

  async obtenerTodos(): Promise<Plato[]> {
    return this.platoRepository.find({
      relations: [
        'id_categoria',
        'id_categoria.id_carta',
        'id_categoria.id_carta.restaurante',
      ],
    });
  }

  async eliminarPlato(id: number): Promise<void> {
    await this.platoRepository.delete(id);
  }

  findAll() {
    return `This action returns all plato`;
  }

  findOne(id: number) {
    return `This action returns a #${id} plato`;
  }

  update(id: number, updatePlatoDto: UpdatePlatoDto) {
    return `This action updates a #${id} plato ${updatePlatoDto.nombre}`;
  }
}
