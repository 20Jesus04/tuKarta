import { Module, forwardRef } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { CartaModule } from 'src/carta/carta.module';
import { PlatoModule } from 'src/plato/plato.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categoria]),
    forwardRef(() => CartaModule),
    forwardRef(() => PlatoModule),
  ],
  controllers: [CategoriaController],
  providers: [CategoriaService],
  exports: [TypeOrmModule, CategoriaService],
})
export class CategoriaModule {}
