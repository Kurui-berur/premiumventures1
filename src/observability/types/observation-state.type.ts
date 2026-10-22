export const ObservationState = {
    PENDING: 'PENDING',
    IN_flight: 'IN_FLIGHT',

} as const;
export type ObservationState = (typeof ObservationState)[keyof typeof ObservationState];