import { Test, TestingModule } from '@nestjs/testing';
import { ImagenesCartaService } from './imagenes-carta.service';

describe('ImagenesCartaService', () => {
  let service: ImagenesCartaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImagenesCartaService],
    }).compile();

    service = module.get<ImagenesCartaService>(ImagenesCartaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
