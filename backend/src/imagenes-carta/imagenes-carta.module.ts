import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagenesCarta } from './entities/imagenes-carta.entity';
import { ImagenesCartaService } from './imagenes-carta.service';
import { ImagenesCartaController } from './imagenes-carta.controller';
import { CartaModule } from 'src/carta/carta.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImagenesCarta]),
    forwardRef(() => CartaModule),
  ],
  controllers: [ImagenesCartaController],
  providers: [ImagenesCartaService],
  exports: [TypeOrmModule, ImagenesCartaService],
})
export class ImagenesCartaModule {}
