import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Valoracion } from './entities/valoracion.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Carta } from 'src/carta/entities/carta.entity';
import { UsuarioModule } from '../usuario/usuario.module';
import { CartaModule } from '../carta/carta.module';

import { ValoracionService } from './valoracion.service';
import { ValoracionController } from './valoracion.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Valoracion, Usuario, Carta]),
    forwardRef(() => UsuarioModule),
    forwardRef(() => CartaModule),
  ],
  controllers: [ValoracionController],
  providers: [ValoracionService],
})
export class ValoracionModule {}
