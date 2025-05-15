import { Module, forwardRef } from '@nestjs/common';
import { RestauranteService } from './restaurante.service';
import { RestauranteController } from './restaurante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurante } from './entities/restaurante.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { CartaModule } from 'src/carta/carta.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurante]),
    UsuarioModule,
    forwardRef(() => CartaModule),
  ],
  providers: [RestauranteService],
  controllers: [RestauranteController],
  exports: [RestauranteService, TypeOrmModule],
})
export class RestauranteModule {}
