import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RestauranteService } from './restaurante.service';
import { CreateRestauranteDto } from './dto/create-restaurante.dto';
import { UpdateRestauranteDto } from './dto/update-restaurante.dto';
import { Express } from 'express';
import { ConfigService } from '@nestjs/config';
import { subirImagenDesdeBuffer } from 'src/common/cloudinary';

@Controller('restaurante')
export class RestauranteController {
  constructor(
    private readonly restauranteService: RestauranteService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('imagen'))
  async create(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    console.log('BODY:', body);
    console.log('file:', file);

    // Subida a Cloudinary
    let imageUrl = '';
    if (file) {
      imageUrl = await subirImagenDesdeBuffer(file.buffer);
      console.log('URL DE LA IMAGEN (Cloudinary): ' + imageUrl);
    }

    const id_dueno = parseInt(body.id_dueno, 10);
    if (isNaN(id_dueno)) {
      throw new BadRequestException('id_dueno debe ser un número válido');
    }

    const restauranteDto: CreateRestauranteDto = {
      nombre: body.nombre,
      direccion: body.direccion,
      telefono: body.telefono,
      imagen_url: imageUrl,
      id_dueno,
    };

    return this.restauranteService.create(restauranteDto);
  }

  @Get('dueno/:id')
  async findByDueno(@Param('id') id: number) {
    return this.restauranteService.findByDueno(id);
  }

  @Get()
  findAll() {
    return this.restauranteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restauranteService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRestauranteDto: UpdateRestauranteDto,
  ) {
    return this.restauranteService.update(+id, updateRestauranteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restauranteService.remove(+id);
  }
}
