
import type { ObservationDeliveryFailure } from
  'src/observability/contracts/delivery/durable/delivery-failure/observation-delivery-failure.interface';

import type {
  ObservationDeliveryDecision,
  ObservationDeliveryRetryPolicy,
} from 'src/observability/contracts/delivery/durable/delivery-failure-policy/observation-delivery-retry-policy.interface';

import type { ObservationDeliveryRetryPolicyOptions } from
  'src/observability/contracts/delivery/durable/delivery-polcy-options/observation-delivery-Retry-polcy-options.interface';

export class DefaultObservationDeliveryRetryPolicy
  implements ObservationDeliveryRetryPolicy
{
  constructor(
    private readonly options: ObservationDeliveryRetryPolicyOptions,
    private readonly random: () => number = Math.random,
  ) {
    this.validateOptions();
  }

  decide(
    failure: ObservationDeliveryFailure,
  ): ObservationDeliveryDecision {
    const disposition = this.classifyFailure(failure);

    if (disposition === 'QUARANTINE') {
      return { action: 'QUARANTINE' };
    }

    if (this.hasExhaustedAttempts(failure)) {
      return { action: 'QUARANTINE' };
    }

    return {
      action: 'RETRY',
      delayMs: this.calculateRetryDelay(failure.attempt),
    };
  }

  private readonly failureDisposition: Record<
  ObservationDeliveryFailure['category'],
  'RETRY' | 'QUARANTINE'
> = {
  VALIDATION: 'QUARANTINE',
  IDENTITY_CONFLICT: 'QUARANTINE',
  STREAM_POSITION_CONFLICT: 'QUARANTINE',
  TRANSIENT: 'RETRY',
  UNKNOWN: 'RETRY',
};

private classifyFailure(
  failure: ObservationDeliveryFailure,
): 'RETRY' | 'QUARANTINE' {
  return this.failureDisposition[failure.category];
}

  private hasExhaustedAttempts(
    failure: ObservationDeliveryFailure,
  ): boolean {
    return failure.attempt >= this.options.maxAtempts;
  }

  private calculateRetryDelay(attempt: number): number {
    const exponent = Math.min(attempt - 1, 52);

    const exponentialDelay =
      this.options.InitialDelaysMs * 2 ** exponent;

    const cappedDelay = Math.min(
      exponentialDelay,
      this.options.maxDelaysMs,
    );

    return Math.floor(
      this.random() * (cappedDelay + 1),
    );
  }

  private validateOptions(): void {
    const {
      maxAtempts,
      InitialDelaysMs,
      maxDelaysMs,
    } = this.options;

    if (!Number.isInteger(maxAtempts) || maxAtempts < 1) {
      throw new Error(
        'maxAttempts must be an integer greater than or equal to 1.',
      );
    }

    if (!Number.isInteger(InitialDelaysMs) || InitialDelaysMs < 0) {
      throw new Error(
        'initialDelayMs must be a non-negative integer.',
      );
    }

    if (
      !Number.isInteger(maxDelaysMs) ||
      maxDelaysMs < InitialDelaysMs
    ) {
      throw new Error(
        'maxDelayMs must be an integer greater than or equal to initialDelayMs.',
      );
    }
  }
}
