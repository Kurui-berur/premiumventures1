import { SceneEvent } from "src/core/events/types/scene-event.type";

export interface FlowPlugin {

  readonly id: string;

  interpret(
    interaction: NormalizedInteraction,
    context: InteractionContext
  ): SceneEvent | null;

  evaluate(
    event: SceneEvent,
    context: InteractionContext
  ): PluginDecision;
}