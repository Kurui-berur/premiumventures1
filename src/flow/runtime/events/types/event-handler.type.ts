import { SceneEvent } from "./scene-event.type";

export type Handler =
(event: SceneEvent) => Promise<void> | void;