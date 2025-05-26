import { Injectable, NotFoundException } from '@nestjs/common';
import { Carta } from './entities/carta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { CreateCartaDto } from './dto/create-carta.dto';
import { UpdateCartaDto } from './dto/update-carta.dto';
import { Restaurante } from 'src/restaurante/entities/restaurante.entity';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Plato } from 'src/plato/entities/plato.entity';

@Injectable()
export class CartaService {
  constructor(
    @InjectRepository(Carta)
    private readonly cartaRepository: Repository<Carta>,

    @InjectRepository(Restaurante)
    private readonly restauranteRepository: Repository<Carta>,

    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,

    @InjectRepository(Plato)
    private readonly platoRepository: Repository<Plato>,
  ) {}

  async buscarCartasGlobal(termino: string, orden?: string): Promise<Carta[]> {
    termino = termino?.toLowerCase() ?? '';
    const query = this.cartaRepository
      .createQueryBuilder('carta')
      .leftJoinAndSelect('carta.restaurante', 'restaurante')
      .leftJoinAndSelect('carta.categorias', 'categoria')
      .leftJoinAndSelect('categoria.platos', 'plato')
      .leftJoinAndSelect('carta.imagenes', 'imagen')
      .leftJoinAndSelect('carta.valoraciones', 'valoracion')
      .where(
        new Brackets((qb) => {
          qb.where('LOWER(carta.nombre) ILIKE :termino', {
            termino: `%${termino}%`,
          })
            .orWhere('LOWER(restaurante.nombre) ILIKE :termino', {
              termino: `%${termino}%`,
            })
            .orWhere('LOWER(restaurante.direccion) ILIKE :termino', {
              termino: `%${termino}%`,
            })
            .orWhere('LOWER(categoria.nombre) ILIKE :termino', {
              termino: `%${termino}%`,
            })
            .orWhere('LOWER(plato.nombre) ILIKE :termino', {
              termino: `%${termino}%`,
            });
        }),
      );

    // Orden dinámico por subquery
    if (orden === 'valoracion') {
      query
        .addSelect((subQuery) => {
          return subQuery
            .select('COALESCE(AVG(v.puntuacion), 0)')
            .from('valoraciones', 'v')
            .where('v.id_carta = carta.id');
        }, 'media_valoracion')
        .orderBy('media_valoracion', 'DESC');
    } else if (orden === 'reciente') {
      query.orderBy('carta.fecha_creacion', 'DESC');
    } else if (orden === 'precio') {
      query
        .addSelect((subQuery) => {
          return subQuery
            .select('COALESCE(MIN(p.precio), 0)')
            .from('platos', 'p')
            .leftJoin('categorias', 'c', 'p.id_categoria = c.id')
            .where('c.id_carta = carta.id');
        }, 'min_precio')
        .orderBy('min_precio', 'ASC');
    } else if (orden === 'precio_desc') {
      query
        .addSelect((subQuery) => {
          return subQuery
            .select('COALESCE(MAX(p.precio), 0)')
            .from('platos', 'p')
            .leftJoin('categorias', 'c', 'p.id_categoria = c.id')
            .where('c.id_carta = carta.id');
        }, 'max_precio')
        .orderBy('max_precio', 'DESC');
    }

    // GROUP BY obligatorio para PostgreSQL
    query.groupBy('carta.id');
    query.addGroupBy('restaurante.id');
    query.addGroupBy('categoria.id');
    query.addGroupBy('plato.id');
    query.addGroupBy('imagen.id');
    query.addGroupBy('valoracion.id');

    return await query.getMany();
  }

  async findByIdConCategoriasYPlatos(id: number): Promise<Carta> {
    const carta = await this.cartaRepository.findOne({
      where: { id },
      relations: ['categorias', 'categorias.platos', 'restaurante'],
    });

    if (!carta) {
      throw new NotFoundException(`Carta con ID ${id} no encontrada`);
    }

    return carta;
  }

  async create(createCartaDto: CreateCartaDto): Promise<Carta> {
    const restaurante = await this.restauranteRepository.findOne({
      where: { id: createCartaDto.id_restaurante },
    });

    if (!restaurante) {
      throw new NotFoundException(
        `Restaurante con ID ${createCartaDto.id_restaurante} no encontrado`,
      );
    }

    const nuevaCarta = this.cartaRepository.create({
      nombre: createCartaDto.nombre,
      restaurante,
    });
    return await this.cartaRepository.save(nuevaCarta);
  }

  async updateCompleta(id: number, data: UpdateCartaDto): Promise<Carta> {
    const carta = await this.cartaRepository.findOne({
      where: { id },
      relations: ['categorias', 'categorias.platos'],
    });

    if (!carta) {
      throw new NotFoundException(`Carta con ID ${id} no encontrada`);
    }

    carta.nombre = data.nombre;
    await this.cartaRepository.save(carta);

    // Elimina categorías y platos antiguos
    await this.categoriaRepository.delete({ id_carta: { id } });
    // Inserta nuevas categorías y platos
    for (const categoriaData of data.categorias) {
      const nuevaCategoria = this.categoriaRepository.create({
        nombre: categoriaData.nombre,
        id_carta: carta,
      });
      const categoriaGuardada =
        await this.categoriaRepository.save(nuevaCategoria);

      for (const plato of categoriaData.platos) {
        await this.platoRepository.save({
          nombre: plato.nombre,
          descripcion: plato.descripcion,
          precio: plato.precio,
          id_categoria: categoriaGuardada,
        });
      }
    }

    return carta;
  }

  async findByRestauranteId(id_restaurante: number): Promise<Carta> {
    const carta = await this.cartaRepository.findOne({
      where: { restaurante: { id: id_restaurante } },
      relations: ['categorias', 'categorias.platos', 'restaurante'],
    });

    if (!carta) {
      throw new NotFoundException(
        'No se encontró la carta para este restaurante',
      );
    }

    return carta;
  }

  findAll(): Promise<Carta[]> {
    return this.cartaRepository.find({
      relations: ['restaurante'],
    });
  }
  findOne(id: number) {
    return `This action returns a #${id} carta`;
  }

  async eliminarCarta(id: number): Promise<void> {
    await this.cartaRepository.delete(id);
  }
}
