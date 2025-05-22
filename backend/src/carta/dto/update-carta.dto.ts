import { IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PlatoDto {
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  descripcion: string;

  @IsNotEmpty()
  precio: number;
}

class CategoriaDto {
  @IsNotEmpty()
  nombre: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlatoDto)
  platos: PlatoDto[];
}

export class UpdateCartaDto {
  @IsNotEmpty()
  nombre: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoriaDto)
  categorias: CategoriaDto[];
}
