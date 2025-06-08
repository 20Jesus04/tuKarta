import { PartialType } from '@nestjs/mapped-types';
import { CreateImagenesCartaDto } from './create-imagenes-carta.dto';

export class UpdateImagenesCartaDto extends PartialType(
  CreateImagenesCartaDto,
) {}
