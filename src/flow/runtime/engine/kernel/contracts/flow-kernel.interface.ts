;

export interface FlowKernel {

  // ======================================================
  // EVENT LAYER (SOURCE OF ALL STATE TRANSITIONS)
  // ======================================================

  readonly bus: SceneEventBus;

  // ======================================================
  // STATE LAYER (REACTIVE SOURCE OF TRUTH)
  // ======================================================

  readonly store: SceneStateStore;

  // ======================================================
  // EXECUTION LAYER (SIDE-EFFECT ENGINE)
  // ======================================================

  readonly processor: SceneProcessor;

  // ======================================================
  // BOOTSTRAP LAYER (INITIAL STATE SEEDING)
  // ======================================================

  readonly bootstrapper: SceneBootstrapper;

}