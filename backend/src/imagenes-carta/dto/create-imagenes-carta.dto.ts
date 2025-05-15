import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateImagenesCartaDto {
  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsNumber()
  id_carta: number;
}
