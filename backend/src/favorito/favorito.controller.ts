import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FavoritoService } from './favorito.service';
import { CreateFavoritoDto } from './dto/create-favorito.dto';

@Controller('favorito')
export class FavoritoController {
  constructor(private readonly favoritoService: FavoritoService) {}

  @Post('toggle')
  toggle(@Body() dto: CreateFavoritoDto) {
    return this.favoritoService.toggleFavorito(dto);
  }

  @Get(':idUsuario')
  obtenerFavoritos(@Param('idUsuario') idUsuario: number) {
    return this.favoritoService.obtenerFavoritosPorUsuario(idUsuario);
  }

  @Get('es-favorito/:idUsuario/:idCarta')
  async esFavorito(
    @Param('idUsuario') idUsuario: number,
    @Param('idCarta') idCarta: number,
  ) {
    const resultado = await this.favoritoService.esFavorito(idUsuario, idCarta);
    return { esFavorito: resultado };
  }
}
