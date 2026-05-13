export interface FlowPresenter {
  present(state: any): {
    step: string;
    data?: any;
    error?: string | null;
  };
}
