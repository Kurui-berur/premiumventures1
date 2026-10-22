import { ObservationContext } from "../context/observationContext.interface";

/**
 * Creates an observation context for a logical observability scope.
 *
 * The factory centralizes construction of observation context so that
 * producers do not repeatedly assemble the contextual information
 * required by observations.
 */
export interface ObservationContextFactory {
  /**
   * Creates an observation context.
   *
   * @param scopeId
   * Identifies the logical scope in which observations occur.
   *
   * @param streamId
   * Identifies the ordered observation stream within the scope.
   *
   * @param parentScopeId
   * Optionally identifies the larger scope containing this scope.
   *
   * @returns A new observation context.
   */
  create(
    scopeId: string,
    streamId: string,
    parentScopeId?: string,
  ): ObservationContext;
}