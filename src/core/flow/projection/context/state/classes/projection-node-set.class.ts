import { ProjectionNodeSet }
from "../../../contracts/nodes/projection-node-set.interface";

export class ProjectionNodeState {

    private projectionNodes?:
        ProjectionNodeSet;

    set(

        projectionNodes:
            ProjectionNodeSet,

    ): void {

        this.projectionNodes =
            projectionNodes;

    }

    get():

        ProjectionNodeSet
        | undefined {

        return this.projectionNodes;

    }

    has(): boolean {

        return this.projectionNodes !== undefined;

    }

    require():

        ProjectionNodeSet {

        if (
            this.projectionNodes === undefined
        ) {

            throw new Error(

                "ProjectionState does not contain a ProjectionNodeSet.",

            );

        }

        return this.projectionNodes;

    }

}