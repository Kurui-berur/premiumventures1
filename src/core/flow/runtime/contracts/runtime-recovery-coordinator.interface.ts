export interface RuntimeRecoveryCoordinator {

  recover(): Promise<void>;

}