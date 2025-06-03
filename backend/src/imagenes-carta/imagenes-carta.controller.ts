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
import { ImagenesCartaService } from './imagenes-carta.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateImagenesCartaDto } from './dto/create-imagenes-carta.dto';
import { UpdateImagenesCartaDto } from './dto/update-imagenes-carta.dto';
import { ConfigService } from '@nestjs/config';
import { subirImagenDesdeBuffer } from 'src/common/cloudinary';

@Controller('imagenes-carta')
export class ImagenesCartaController {
  constructor(
    private readonly imagenesCartaService: ImagenesCartaService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('imagen'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateImagenesCartaDto,
  ) {
    if (!file) {
      throw new BadRequestException('La imagen es obligatoria');
    }

    const imageUrl = await subirImagenDesdeBuffer(file.buffer);

    return this.imagenesCartaService.create(body, imageUrl);
  }

  @Get('/carta/:id')
  async findByCarta(@Param('id') id: string) {
    const idNumerico = parseInt(id, 10);
    if (isNaN(idNumerico)) {
      throw new BadRequestException('El ID de carta debe ser un número válido');
    }

    return this.imagenesCartaService.findByCarta(idNumerico);
  }

  @Get()
  findAll() {
    return this.imagenesCartaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagenesCartaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateImagenesCartaDto: UpdateImagenesCartaDto,
  ) {
    return this.imagenesCartaService.update(+id, updateImagenesCartaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const idNumerico = parseInt(id, 10);
    if (isNaN(idNumerico)) {
      throw new BadRequestException('El ID debe ser un número válido');
    }

    return this.imagenesCartaService.remove(idNumerico);
  }
}
