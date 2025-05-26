import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Categoria } from '../categoria/entities/categoria.entity';
import { Plato } from '../plato/entities/plato.entity';
import { Valoracion } from '../valoracion/entities/valoracion.entity';
import { Carta } from 'src/carta/entities/carta.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Carta, Categoria, Plato, Valoracion]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
