import { Injectable } from '@nestjs/common';
import { Carta } from './entities/carta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// import { CreateCartaDto } from './dto/create-carta.dto';
// import { UpdateCartaDto } from './dto/update-carta.dto';

@Injectable()
export class CartaService {
  // create(createCartaDto: CreateCartaDto) {
  //   return 'This action adds a new carta';
  // }

  constructor(
    @InjectRepository(Carta)
    private readonly cartaRepository: Repository<Carta>,
  ) {}

  findAll(): Promise<Carta[]> {
    return this.cartaRepository.find({
      relations: ['restaurante'],
    });
  }
  findOne(id: number) {
    return `This action returns a #${id} carta`;
  }

  // update(id: number, updateCartaDto: UpdateCartaDto) {
  //   return `This action updates a #${id} carta`;
  // }

  remove(id: number) {
    return `This action removes a #${id} carta`;
  }
}
