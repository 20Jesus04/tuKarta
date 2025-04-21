import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carta } from './entities/carta.entity';
import { Restaurante } from 'src/restaurante/entities/restaurante.entity'; // <-- Importar la entidad
import { CartaService } from './carta.service';
import { CartaController } from './carta.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Carta, Restaurante]), // <-- IMPORTANTE
  ],
  controllers: [CartaController],
  providers: [CartaService],
})
export class CartaModule {}
