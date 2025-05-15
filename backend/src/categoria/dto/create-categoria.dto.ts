import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCategoriaDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsNumber()
  id_carta: number;
}
