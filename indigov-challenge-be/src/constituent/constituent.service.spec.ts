import { Test, TestingModule } from '@nestjs/testing';
import { ConstituentService } from './constituent.service';

describe('ConstituentService', () => {
  let service: ConstituentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConstituentService],
    }).compile();

    service = module.get<ConstituentService>(ConstituentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
