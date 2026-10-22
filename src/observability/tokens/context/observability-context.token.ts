/**
 * Injection token for the observation context associated with
 * the current observation scope.
 *
 * The provided ObservationContext must represent the scope
 * in which the consuming component is operating.
 */
export const OBSERVATION_CONTEXT = Symbol(
  'OBSERVATION_CONTEXT',
);