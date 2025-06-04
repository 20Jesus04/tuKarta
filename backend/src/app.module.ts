import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <== importar TypeOrm
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartaModule } from './carta/carta.module';
import { RestauranteModule } from './restaurante/restaurante.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriaModule } from './categoria/categoria.module';
import { ImagenesCartaModule } from './imagenes-carta/imagenes-carta.module';
import { PlatoModule } from './plato/plato.module';
import { ValoracionModule } from './valoracion/valoracion.module';
import { AdminModule } from './admin/admin.module';
import { FavoritoModule } from './favorito/favorito.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'interchange.proxy.rlwy.net', // o la IP si es remota
      port: 36270,
      username: 'postgres',
      password: 'ljndVJdPsEipfLrJMCWueYkJCkfzGOOA',
      database: 'railway',
      autoLoadEntities: true, // detecta automáticamente las entidades
      synchronize: false,
    }),
    CartaModule,
    RestauranteModule,
    UsuarioModule,
    AuthModule,
    CategoriaModule,
    ImagenesCartaModule,
    PlatoModule,
    ValoracionModule,
    AdminModule,
    FavoritoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
