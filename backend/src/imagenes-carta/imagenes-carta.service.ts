import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImagenesCartaDto } from './dto/create-imagenes-carta.dto';
import { UpdateImagenesCartaDto } from './dto/update-imagenes-carta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImagenesCarta } from './entities/imagenes-carta.entity';
import { Carta } from 'src/carta/entities/carta.entity';

@Injectable()
export class ImagenesCartaService {
  constructor(
    @InjectRepository(ImagenesCarta)
    private readonly imagenRepository: Repository<ImagenesCarta>,
    @InjectRepository(Carta)
    private readonly cartaRepository: Repository<Carta>,
  ) {}

  async create(
    createImagenesCartaDto: CreateImagenesCartaDto,
    imageUrl: string,
  ): Promise<ImagenesCarta> {
    const carta = await this.cartaRepository.findOne({
      where: { id: createImagenesCartaDto.id_carta },
    });

    if (!carta) {
      throw new NotFoundException(
        `Carta con ID ${createImagenesCartaDto.id_carta} no encontrada`,
      );
    }

    const nuevaImagen = this.imagenRepository.create({
      url: imageUrl,
      id_carta: carta,
    });

    return this.imagenRepository.save(nuevaImagen);
  }

  async findByCarta(id_carta: number): Promise<ImagenesCarta[]> {
    return this.imagenRepository.find({
      where: { id_carta: { id: id_carta } },
      relations: ['id_carta'],
    });
  }

  findAll() {
    return `This action returns all imagenesCarta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imagenesCarta`;
  }

  update(id: number, updateImagenesCartaDto: UpdateImagenesCartaDto) {
    return `This action updates a #${id} imagenesCarta ${updateImagenesCartaDto.id_carta}`;
  }

  async remove(id: number): Promise<{ mensaje: string }> {
    const imagen = await this.imagenRepository.findOne({
      where: { id },
    });

    if (!imagen) {
      throw new NotFoundException(`No se encontró ninguna imagen con ID ${id}`);
    }

    await this.imagenRepository.remove(imagen);

    // Si además estás almacenando físicamente la imagen en disco o en un bucket, aquí podrías eliminarla también

    return { mensaje: `Imagen con ID ${id} eliminada correctamente` };
  }
}
