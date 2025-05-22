import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateImagenesCartaDto {
  @IsNotEmpty()
  @IsNumber()
  id_carta: number;
}
