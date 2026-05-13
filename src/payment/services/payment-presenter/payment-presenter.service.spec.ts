import { Test, TestingModule } from '@nestjs/testing';
import { PaymentPresenterService } from './payment-presenter.service';

describe('PaymentPresenterService', () => {
  let service: PaymentPresenterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentPresenterService],
    }).compile();

    service = module.get<PaymentPresenterService>(PaymentPresenterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
