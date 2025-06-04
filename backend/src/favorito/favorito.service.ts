import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorito } from './entities/favorito.entity';
import { CreateFavoritoDto } from './dto/create-favorito.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Carta } from 'src/carta/entities/carta.entity';

@Injectable()
export class FavoritoService {
  constructor(
    @InjectRepository(Favorito) private favoritoRepo: Repository<Favorito>,
    @InjectRepository(Usuario) private usuarioRepo: Repository<Usuario>,
    @InjectRepository(Carta) private cartaRepo: Repository<Carta>,
  ) {}

  async toggleFavorito(dto: CreateFavoritoDto): Promise<string> {
    const { idUsuario, idCarta } = dto;

    const usuario = await this.usuarioRepo.findOne({
      where: { id: idUsuario },
    });
    const carta = await this.cartaRepo.findOne({ where: { id: idCarta } });

    if (!usuario || !carta) throw new Error('Usuario o carta no encontrados');

    const existente = await this.favoritoRepo.findOne({
      where: { usuario, carta },
    });

    if (existente) {
      await this.favoritoRepo.remove(existente);
      return 'Carta eliminada de favoritos';
    }

    const nuevo = this.favoritoRepo.create({ usuario, carta });
    await this.favoritoRepo.save(nuevo);
    return 'Carta añadida a favoritos';
  }

  async obtenerFavoritosPorUsuario(idUsuario: number) {
    return this.favoritoRepo.find({
      where: { usuario: { id: idUsuario } },
      relations: ['carta', 'carta.restaurante'],
    });
  }

  async esFavorito(idUsuario: number, idCarta: number): Promise<boolean> {
    const favorito = await this.favoritoRepo.findOne({
      where: {
        usuario: { id: idUsuario },
        carta: { id: idCarta },
      },
    });
    return !!favorito; // true si existe, false si no
  }
}
