import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaymentHandlerService } from './services/payment-handler/payment-handler.service';
import { PaymentPresenterService } from './services/payment-presenter/payment-presenter.service';
import { Dispute } from './entities/dispute.entity';
import { Settlement } from './entities/settlement.entity';
import { WebhookEvent } from './entities/webHook-event.entity';
import { LedgerEntry } from './entities/ledger-entry.entity';
import { PaymentEvent } from './entities/payment-event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentAttempt } from './entities/payment-atempt.entity';
import { Payment } from './entities/payment.entity';
import { Refund } from './entities/refund.entity';

@Module({
  imports: [    TypeOrmModule.forFeature([
      Payment,
      PaymentAttempt,
      Refund,
      PaymentEvent,
      LedgerEntry,
      WebhookEvent,
      Settlement,
      Dispute,
    ]),],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentHandlerService, PaymentPresenterService]
})
export class PaymentModule {}
