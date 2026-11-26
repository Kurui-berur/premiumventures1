export interface ObservationDeliveryRetryPolicyOptions {


    /**
     * The maximum number of times a delivery attempt may be retried including the first 
     */
    readonly maxAtempts: number;

    /**
     * initial retry delay in miliseconds 
     */

    readonly  InitialDelaysMs:number


    /**
     * maximum retry delay in miliseconds
     */
    
    readonly maxDelaysMs:number

}