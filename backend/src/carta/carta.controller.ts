import {
  Controller,
  Get,
  Put,
  Param,
  Delete,
  Post,
  Body,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CartaService } from './carta.service';
import { CreateCartaDto } from './dto/create-carta.dto';
import { UpdateCartaDto } from './dto/update-carta.dto';
import { Carta } from './entities/carta.entity';

@Controller('carta')
export class CartaController {
  constructor(private readonly cartaService: CartaService) {}

  @Post()
  create(@Body() createCartaDto: CreateCartaDto): Promise<Carta> {
    return this.cartaService.create(createCartaDto);
  }

  @Get()
  findAll() {
    return this.cartaService.findAll();
  }

  @Get('buscar')
  async buscarCartas(
    @Query('q') termino: string,
    @Query('orden') orden: string,
  ) {
    return this.cartaService.buscarCartasGlobal(termino, orden);
  }

  @Get(':id/completa')
  getCartaPorId(@Param('id', ParseIntPipe) id: number) {
    return this.cartaService.findByIdConCategoriasYPlatos(id);
  }

  @Get('/restaurante/:id_restaurante')
  getCartaPorRestaurante(@Param('id_restaurante', ParseIntPipe) id: number) {
    return this.cartaService.findByRestauranteId(id);
  }

  @Put(':id/completa')
  async actualizarCartaCompleta(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCartaDto,
  ) {
    return this.cartaService.updateCompleta(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartaService.remove(+id);
  }
}
