export interface FlowNode {

  id: string;

  /**
   * Pure semantic classification (optional for logic only)
   */
  type?: string;

  /**
   * UI rendering contract (PRIMARY)
   * 
   */


  renderer: string;

  content?: unknown;

  sceneId: string;

 // metadata?: Record<string, unknown>;
}