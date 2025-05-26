import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlatoService } from './plato.service';
import { CreatePlatoDto } from './dto/create-plato.dto';
import { UpdatePlatoDto } from './dto/update-plato.dto';
import { Plato } from './entities/plato.entity';

@Controller('plato')
export class PlatoController {
  constructor(private readonly platoService: PlatoService) {}

  @Post()
  create(@Body() createPlatoDto: CreatePlatoDto): Promise<Plato> {
    return this.platoService.create(createPlatoDto);
  }

  @Get()
  async obtenerPlatos() {
    return this.platoService.obtenerTodos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.platoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlatoDto: UpdatePlatoDto) {
    return this.platoService.update(+id, updatePlatoDto);
  }

  @Delete(':id')
  async eliminarPlato(@Param('id') id: number) {
    return this.platoService.eliminarPlato(id);
  }
}
