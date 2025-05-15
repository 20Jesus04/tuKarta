import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreatePlatoDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsNotEmpty()
  @IsNumber()
  precio: number;

  @IsNotEmpty()
  @IsNumber()
  id_categoria: number;
}
