import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plato } from './entities/plato.entity';
import { PlatoService } from './plato.service';
import { PlatoController } from './plato.controller';
import { CategoriaModule } from 'src/categoria/categoria.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Plato]),
    forwardRef(() => CategoriaModule),
  ],
  controllers: [PlatoController],
  providers: [PlatoService],
  exports: [TypeOrmModule, PlatoService],
})
export class PlatoModule {}
