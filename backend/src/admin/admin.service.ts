import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Carta } from '../carta/entities/carta.entity';
import { Categoria } from '../categoria/entities/categoria.entity';
import { Plato } from '../plato/entities/plato.entity';
import { Valoracion } from '../valoracion/entities/valoracion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepo: Repository<Usuario>,
    @InjectRepository(Carta)
    private CartaRepo: Repository<Carta>,
    @InjectRepository(Categoria) private categoriaRepo: Repository<Categoria>,
    @InjectRepository(Plato) private platoRepo: Repository<Plato>,
    @InjectRepository(Valoracion)
    private valoracionRepo: Repository<Valoracion>,
  ) {}

  async obtenerResumen() {
    const [
      totalUsuarios,
      totalCarta,
      totalCategorias,
      totalPlatos,
      totalValoraciones,
    ] = await Promise.all([
      this.usuarioRepo.count(),
      this.CartaRepo.count(),
      this.categoriaRepo.count(),
      this.platoRepo.count(),
      this.valoracionRepo.count(),
    ]);

    return {
      totalUsuarios,
      totalCarta,
      totalCategorias,
      totalPlatos,
      totalValoraciones,
    };
  }
}
