import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRestauranteDto {
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  direccion: string;

  @IsNotEmpty()
  telefono: string;

  @IsOptional()
  imagen_url?: string;

  @IsNotEmpty()
  id_dueno: number;
}
