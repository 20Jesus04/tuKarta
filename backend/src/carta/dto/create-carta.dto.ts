import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCartaDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsNumber()
  id_restaurante: number;
}
