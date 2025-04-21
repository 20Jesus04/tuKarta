import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <== importar TypeOrm
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartaModule } from './carta/carta.module';
import { RestauranteModule } from './restaurante/restaurante.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'interchange.proxy.rlwy.net', // o la IP si es remota
      port: 36270,
      username: 'postgres',
      password: 'ljndVJdPsEipfLrJMCWueYkJCkfzGOOA',
      database: 'railway',
      autoLoadEntities: true, // detecta automáticamente las entidades
      synchronize: false, // crea tablas automáticamente (solo para desarrollo)
    }),
    CartaModule,
    RestauranteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
