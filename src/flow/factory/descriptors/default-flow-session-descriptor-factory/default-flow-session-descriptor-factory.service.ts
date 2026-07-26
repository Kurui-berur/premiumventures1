import { Injectable } from '@nestjs/common';

import { FlowView } from 'src/core/flow/projection/contracts/nodes/flow-view.interface';
import { ProjectionRuntimeReader } from 'src/core/flow/runtime/contracts/reader/projection-runtime-reader.interface';
import { FlowRuntimeState } from 'src/core/flow/runtime/state/flow-runtime-state';
import { NodeRuntimeState } from 'src/core/flow/runtime/state/node-runtime-state';
import { SceneRuntimeState } from 'src/core/flow/runtime/state/scene-runtime-state';

import { CompositionSession } from 'src/flow/context/session/composition-session.class';
import {FlowSessionRuntime } from 'src/flow/context/state/flow-session-runtime.class';
import { FlowSessionDescriptor } from 'src/flow/contracts/descriptors/flow-session-descriptor.imterface';
import { FlowSessionDescriptorFactory } from 'src/flow/contracts/factory/flow-session-descriptor-factory.interface';

@Injectable()
export class DefaultFlowSessionDescriptorFactoryService
    implements FlowSessionDescriptorFactory {

    async create(
        session: CompositionSession,
    ): Promise<FlowSessionDescriptor> {

        const flowView =

            session
                .frame
                .projection
                .requireFlowView();

        const runtime =

            session
                .frame
                .runtime;

        const runtimeState =

            this.buildRuntimeState(

                flowView,

                runtime,

            );

        return {

            runtime:

                runtimeState,

            view:

                flowView,

        };

    }

    private buildRuntimeState(

        flowView: FlowView,

        runtime: ProjectionRuntimeReader,

    ): Readonly<FlowRuntimeState> {

        const sceneStates =

            this.collectSceneStates(

                flowView,

                runtime,

            );

        const nodeStates =

            this.collectNodeStates(

                flowView,

                runtime,

            );

        return new FlowSessionRuntime(

            runtime.currentSceneId(),

            runtime.activeNodeId(),

            sceneStates,

            nodeStates,

        );

    }

    private collectSceneStates(

        flowView: FlowView,

        runtime: ProjectionRuntimeReader,

    ): ReadonlyMap<
        string,
        SceneRuntimeState
    > {

        const sceneStates =

            new Map<
                string,
                SceneRuntimeState
            >();

        for (

            const sceneId

            of flowView.sceneIds()

        ) {

            const sceneState =

                runtime.sceneState(
                    sceneId,
                );

            if (

                !sceneState

            ) {

                continue;

            }

            sceneStates.set(

                sceneId,

                sceneState,

            );

        }

        return sceneStates;

    }

    private collectNodeStates(

        flowView: FlowView,

        runtime: ProjectionRuntimeReader,

    ): ReadonlyMap<
        string,
        NodeRuntimeState
    > {

        const nodeStates =

            new Map<
                string,
                NodeRuntimeState
            >();

        for (

            const sceneId

            of flowView.sceneIds()

        ) {

            const scene =

                flowView.scene(
                    sceneId,
                );

            if (

                !scene

            ) {

                continue;

            }

            for (

                const nodeId

                of scene.nodeIds()

            ) {

                const nodeState =

                    runtime.nodeState(
                        nodeId,
                    );

                if (

                    !nodeState

                ) {

                    continue;

                }

                nodeStates.set(

                    nodeId,

                    nodeState,

                );

            }

        }

        return nodeStates;

    }

}