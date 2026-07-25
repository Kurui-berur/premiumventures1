import { Injectable } from '@nestjs/common';
import { ProjectionNodeDescriptor } from '../../contracts/nodes/projection-node-descriptor.interface';
import type { ProjectionCandidateNodeSet } from '../../contracts/nodes/ProjectionCandidateNodeSet.interface';

@Injectable()
export class DefaultProjectionNodeDescriptor implements ProjectionNodeDescriptor{
   
   readonly candidateNodes:
        ProjectionCandidateNodeSet;

    readonly nodeIds:
        ReadonlySet<string>;

    readonly sceneIndex:
        ReadonlyMap<
            string,
            readonly string[]
        >;

    constructor(

        candidateNodes:
            ProjectionCandidateNodeSet,

        nodeIds:
            ReadonlySet<string>,

        sceneIndex:
            ReadonlyMap<
                string,
                readonly string[]
            >,

    ) {

        this.candidateNodes =
            candidateNodes;

        /**
         * Take ownership.
         */
        this.nodeIds =
            new Set(
                nodeIds,
            );

        /**
         * Deep copy every scene entry.
         */
        this.sceneIndex =
            new Map(

                [...sceneIndex].map(

                    ([

                        sceneId,

                        nodes,

                    ]) => [

                        sceneId,

                        Object.freeze(
                            [...nodes],
                        ),

                    ],

                ),

            );

        Object.freeze(
            this,
        );

    }
}
