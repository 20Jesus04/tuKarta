import { Injectable } from '@nestjs/common';
import { CreateImagenesCartaDto } from './dto/create-imagenes-carta.dto';
import { UpdateImagenesCartaDto } from './dto/update-imagenes-carta.dto';

@Injectable()
export class ImagenesCartaService {
  create(createImagenesCartaDto: CreateImagenesCartaDto) {
    return 'This action adds a new imagenesCarta';
  }

  findAll() {
    return `This action returns all imagenesCarta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imagenesCarta`;
  }

  update(id: number, updateImagenesCartaDto: UpdateImagenesCartaDto) {
    return `This action updates a #${id} imagenesCarta`;
  }

  remove(id: number) {
    return `This action removes a #${id} imagenesCarta`;
  }
}
