import { IsInt, IsString, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateValoracionDto {
  @IsInt()
  @Min(1)
  @Max(5)
  puntuacion: number;

  @IsString()
  @IsNotEmpty()
  comentario: string;

  @IsInt()
  id_usuario: number;

  @IsInt()
  id_carta: number;
}
