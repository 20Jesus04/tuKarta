import { Injectable } from '@nestjs/common';
import { CreatePlatoDto } from './dto/create-plato.dto';
import { UpdatePlatoDto } from './dto/update-plato.dto';

@Injectable()
export class PlatoService {
  create(createPlatoDto: CreatePlatoDto) {
    return 'This action adds a new plato';
  }

  findAll() {
    return `This action returns all plato`;
  }

  findOne(id: number) {
    return `This action returns a #${id} plato`;
  }

  update(id: number, updatePlatoDto: UpdatePlatoDto) {
    return `This action updates a #${id} plato`;
  }

  remove(id: number) {
    return `This action removes a #${id} plato`;
  }
}
