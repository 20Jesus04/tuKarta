import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateValoracionDto } from './dto/create-valoracion.dto';
import { Valoracion } from './entities/valoracion.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Carta } from 'src/carta/entities/carta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ValoracionService {
  constructor(
    @InjectRepository(Valoracion)
    private readonly valoracionRepo: Repository<Valoracion>,

    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,

    @InjectRepository(Carta)
    private readonly cartaRepo: Repository<Carta>,
  ) {}

  async crear(data: CreateValoracionDto): Promise<Valoracion> {
    const usuario = await this.usuarioRepo.findOne({
      where: { id: data.id_usuario },
    });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const carta = await this.cartaRepo.findOne({
      where: { id: data.id_carta },
    });
    if (!carta) throw new NotFoundException('Carta no encontrada');

    const yaExiste = await this.valoracionRepo.findOne({
      where: {
        id_usuario: { id: data.id_usuario },
        id_carta: { id: data.id_carta },
      },
    });

    if (yaExiste) {
      throw new BadRequestException('El usuario ya ha valorado esta carta');
    }

    const valoracion = this.valoracionRepo.create({
      puntuacion: data.puntuacion,
      comentario: data.comentario,
      id_usuario: usuario,
      id_carta: carta,
    });

    return this.valoracionRepo.save(valoracion);
  }

  async obtenerPorCarta(id_carta: number): Promise<Valoracion[]> {
    return this.valoracionRepo.find({
      where: { id_carta: { id: id_carta } },
      relations: ['id_usuario'],
      order: { fecha: 'DESC' },
    });
  }

  async usuarioYaValoro(
    id_carta: number,
    id_usuario: number,
  ): Promise<boolean> {
    const valoracion = await this.valoracionRepo.findOne({
      where: {
        id_carta: { id: id_carta },
        id_usuario: { id: id_usuario },
      },
    });
    return !!valoracion;
  }

  findAll() {
    return `This action returns all valoracion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} valoracion`;
  }

  remove(id: number) {
    return `This action removes a #${id} valoracion`;
  }
}
