import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ValoracionService } from './valoracion.service';
import { CreateValoracionDto } from './dto/create-valoracion.dto';
import { Valoracion } from 'src/valoracion/entities/valoracion.entity';

@Controller('valoracion')
export class ValoracionController {
  constructor(private readonly valoracionService: ValoracionService) {}

  @Post()
  async crear(@Body() data: CreateValoracionDto): Promise<Valoracion> {
    return this.valoracionService.crear(data);
  }

  @Get('carta/:id')
  async obtenerPorCarta(@Param('id') id: number): Promise<Valoracion[]> {
    return this.valoracionService.obtenerPorCarta(id);
  }

  @Get('estadisticas/:id')
  async obtenerEstadisticas(@Param('id') id: number) {
    return this.valoracionService.obtenerEstadisticasPorCarta(id);
  }

  @Get()
  findAll() {
    return this.valoracionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.valoracionService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.valoracionService.remove(+id);
  }
}
