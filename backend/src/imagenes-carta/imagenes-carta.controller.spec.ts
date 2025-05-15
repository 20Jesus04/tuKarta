import { Test, TestingModule } from '@nestjs/testing';
import { ImagenesCartaController } from './imagenes-carta.controller';
import { ImagenesCartaService } from './imagenes-carta.service';

describe('ImagenesCartaController', () => {
  let controller: ImagenesCartaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagenesCartaController],
      providers: [ImagenesCartaService],
    }).compile();

    controller = module.get<ImagenesCartaController>(ImagenesCartaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
