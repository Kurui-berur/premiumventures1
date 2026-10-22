
/**
 * Describes a snapshot of an observation buffer's workload and cumulative
 * lifecycle activity.
 *
 * Current workload counts describe observations that remain active in the
 * buffer. Cumulative counters describe lifecycle operations recorded over
 * the buffer's lifetime.
 *
 * The statistics can help a publisher or monitoring component understand
 * whether observations are accumulating faster than they are being
 * published.
 *
 * These statistics do not, by themselves, determine delivery policy,
 * guarantee durable storage, or confirm downstream consumer processing.
 */
export interface ObservationBufferStats {
  /**
   * Total number of observations accepted by the buffer since its
   * initialization.
   */
  readonly received: number;

  /**
   * Number of observations currently available for publication.
   */
  readonly pending: number;

  /**
   * Number of observations currently claimed for publication.
   */
  readonly inFlight: number;

  /**
   * Cumulative number of successful acknowledgement operations applied
   * to buffered observations.
   *
   * This is a historical counter, not the number of observations currently
   * stored in the buffer.
   */
  readonly acknowledged: number;

  /**
   * Cumulative number of successful release operations that returned
   * in-flight observations to the pending state.
   *
   * An observation may contribute to this count more than once if it is
   * released during multiple failed publication attempts.
   */
  readonly released: number;
}