/**
 * Injection token for the ObservationSink responsible for
 * accepting observations at the boundary between observation
 * production and downstream observation infrastructure.
 *
 * The sink must not cause the producer to wait for downstream
 * observation delivery or consumer processing.
 */
export const OBSERVATION_SINK = Symbol(
  'OBSERVATION_SINK',
);