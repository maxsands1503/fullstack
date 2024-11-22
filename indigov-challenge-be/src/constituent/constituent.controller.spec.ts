import { Test, TestingModule } from '@nestjs/testing';
import { ConstituentController } from './constituent.controller';
import { ConstituentService } from './constituent.service';

describe('ConstituentController', () => {
  let controller: ConstituentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConstituentController],
      providers: [ConstituentService],
    }).compile();

    controller = module.get<ConstituentController>(ConstituentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
