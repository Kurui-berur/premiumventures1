export interface CompiledTransition {

  event: string; // or EventType if you want stricter typing

  targetSceneId: string;

  condition?: (state: Record<string, any>) => boolean;

  priority: number;
}