import { Test, TestingModule } from '@nestjs/testing';
import { BrokerageController } from './brokerage.controller';
import { BrokerageService } from './brokerage.service';

describe('BrokerageController', () => {
  let controller: BrokerageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrokerageController],
      providers: [BrokerageService],
    }).compile();

    controller = module.get<BrokerageController>(BrokerageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
