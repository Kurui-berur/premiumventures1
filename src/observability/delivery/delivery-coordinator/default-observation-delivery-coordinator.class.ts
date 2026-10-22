import { ObservationDeliveryCoordinatorDependencies } from "src/observability/contracts/delivery/delivery-coordinator/observation-delivery-coordinator-dependencies.interface";
import { ObservationDeliveryCoordinator } from "src/observability/contracts/delivery/delivery-coordinator/observation-delivery-coordinator.interface";
import { ObservationDeliveryOutcome, ObservationDeliveryResult } from "src/observability/contracts/delivery/delivery-coordinator/observation-delivery-results.interface";
import { ObservationDeliveryPath } from "src/observability/contracts/delivery/observation-delivery-path.interface";
import { Observation } from "src/observability/contracts/observation/observation.interface";

export class DefaultObservationDeliveryCoordinator implements

 ObservationDeliveryCoordinator {

    constructor(
            private readonly dependencies: ObservationDeliveryCoordinatorDependencies,
    ) {}



    async dispatch(observation: Observation): Promise<ObservationDeliveryResult> {

        const { durablePath, livePath, options } = this.dependencies;

        const durableResultPromise=this.attemptPath(durablePath, observation);

        if(!options.liveEnabled) {
           return {
                durable: await durableResultPromise,
            };}
        
    const [durableResult, liveResult] = await Promise.all([
      durableResultPromise,
      this.attemptPath(livePath, observation),
    ]);

        return {
            durable:durableResult,
            live:  liveResult,
        };


     
    }

    async attemptPath(path: ObservationDeliveryPath, 
        observation: Observation): Promise<ObservationDeliveryOutcome> {

            try{
                path.accept(observation);
                const Result: ObservationDeliveryOutcome = {
                    status: "ACCEPTED",
                };
                return Result;
         
            }catch (error) {
                const Result: ObservationDeliveryOutcome = {
                    status: "FAILED",
                    error,
                };
                return Result;
            }
                }}