export const ExternalEventOrigin = {

    USER_INTERFACE: "USER_INTERFACE",

    API: "API",

    WEBHOOK: "WEBHOOK",

    MESSAGE_QUEUE: "MESSAGE_QUEUE",

    SCHEDULER: "SCHEDULER",

    EMAIL: "EMAIL",

    SMS: "SMS",

    SYSTEM: "SYSTEM",

} as const;

export type ExternalEventOrigin =
      (typeof ExternalEventOrigin)[keyof typeof ExternalEventOrigin];