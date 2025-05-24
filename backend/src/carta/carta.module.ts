import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carta } from './entities/carta.entity';
import { RestauranteModule } from 'src/restaurante/restaurante.module';
import { CategoriaModule } from 'src/categoria/categoria.module';
import { ImagenesCartaModule } from 'src/imagenes-carta/imagenes-carta.module';
import { CartaService } from './carta.service';
import { CartaController } from './carta.controller';
import { PlatoModule } from 'src/plato/plato.module';
import { ValoracionModule } from '../valoracion/valoracion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Carta]),
    forwardRef(() => RestauranteModule),
    forwardRef(() => CategoriaModule),
    forwardRef(() => ImagenesCartaModule),
    forwardRef(() => PlatoModule),
    forwardRef(() => ValoracionModule),
  ],
  controllers: [CartaController],
  providers: [CartaService],
  exports: [TypeOrmModule],
})
export class CartaModule {}
