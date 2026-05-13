import { Test, TestingModule } from '@nestjs/testing';
import { PaymentHandlerService } from './payment-handler.service';

describe('PaymentHandlerService', () => {
  let service: PaymentHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentHandlerService],
    }).compile();

    service = module.get<PaymentHandlerService>(PaymentHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
