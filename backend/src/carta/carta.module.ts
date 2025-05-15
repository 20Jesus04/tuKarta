import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carta } from './entities/carta.entity';
import { RestauranteModule } from 'src/restaurante/restaurante.module';
import { CategoriaModule } from 'src/categoria/categoria.module';
import { ImagenesCartaModule } from 'src/imagenes-carta/imagenes-carta.module';

import { CartaService } from './carta.service';
import { CartaController } from './carta.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Carta]),
    forwardRef(() => RestauranteModule),
    forwardRef(() => CategoriaModule),
    forwardRef(() => ImagenesCartaModule),
  ],
  controllers: [CartaController],
  providers: [CartaService],
  exports: [TypeOrmModule],
})
export class CartaModule {}
