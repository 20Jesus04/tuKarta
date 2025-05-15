import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImagenesCartaService } from './imagenes-carta.service';
import { CreateImagenesCartaDto } from './dto/create-imagenes-carta.dto';
import { UpdateImagenesCartaDto } from './dto/update-imagenes-carta.dto';

@Controller('imagenes-carta')
export class ImagenesCartaController {
  constructor(private readonly imagenesCartaService: ImagenesCartaService) {}

  @Post()
  create(@Body() createImagenesCartaDto: CreateImagenesCartaDto) {
    return this.imagenesCartaService.create(createImagenesCartaDto);
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
  update(@Param('id') id: string, @Body() updateImagenesCartaDto: UpdateImagenesCartaDto) {
    return this.imagenesCartaService.update(+id, updateImagenesCartaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagenesCartaService.remove(+id);
  }
}
