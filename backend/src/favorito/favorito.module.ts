import { Module } from '@nestjs/common';
import { FavoritoService } from './favorito.service';
import { FavoritoController } from './favorito.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Carta } from 'src/carta/entities/carta.entity';
import { Favorito } from './entities/favorito.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorito, Usuario, Carta])],
  controllers: [FavoritoController],
  providers: [FavoritoService],
})
export class FavoritoModule {}
