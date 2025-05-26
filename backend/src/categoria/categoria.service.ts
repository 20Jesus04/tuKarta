import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { Carta } from 'src/carta/entities/carta.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,

    @InjectRepository(Carta)
    private readonly cartaRepository: Repository<Carta>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const carta = await this.cartaRepository.findOne({
      where: { id: createCategoriaDto.id_carta },
    });

    if (!carta) {
      throw new NotFoundException(
        `Carta con ID ${createCategoriaDto.id_carta} no encontrada`,
      );
    }

    const nuevaCategoria = this.categoriaRepository.create({
      nombre: createCategoriaDto.nombre,
      id_carta: carta,
    });

    return this.categoriaRepository.save(nuevaCategoria);
  }

  findAll() {
    return `This action returns all categoria`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoria`;
  }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return `This action updates a #${id} categoria ${updateCategoriaDto.nombre}`;
  }

  async eliminarCategoria(id: number): Promise<void> {
    await this.categoriaRepository.delete(id);
  }

  async obtenerTodas(): Promise<Categoria[]> {
    return this.categoriaRepository.find({
      relations: ['id_carta', 'id_carta.restaurante'],
    });
  }
}
