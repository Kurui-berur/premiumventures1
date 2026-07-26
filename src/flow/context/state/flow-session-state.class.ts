import { FlowSession } from "src/flow/contracts/flow-session.contract";

export class FlowSessionState {

    private session?: FlowSession;

    set(
        session: FlowSession,
    ): void {

        this.session = session;

    }

    require(): FlowSession {

        if (!this.session) {

            throw new Error(
                'FlowSessionState does not contain a flow session.',
            );

        }

        return this.session;

    }

    get(): FlowSession | undefined {

        return this.session;

    }

}