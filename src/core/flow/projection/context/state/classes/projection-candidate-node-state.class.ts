import { ProjectionCandidateNodeSet } from "../../../contracts/nodes/ProjectionCandidateNodeSet.interface";

export class ProjectionCandidateNodeState {

    private candidateNodes?:
        ProjectionCandidateNodeSet;

    set(

        candidateNodes:
            ProjectionCandidateNodeSet,

    ): void {

        this.candidateNodes =
            candidateNodes;

    }

    get():

        ProjectionCandidateNodeSet
        | undefined {

        return this.candidateNodes;

    }

    has(): boolean {

        return this.candidateNodes !== undefined;

    }

    require():

        ProjectionCandidateNodeSet {

        if (
            this.candidateNodes === undefined
        ) {

            throw new Error(

                "ProjectionState does not contain a ProjectionCandidateNodeSet.",

            );

        }

        return this.candidateNodes;

    }

}