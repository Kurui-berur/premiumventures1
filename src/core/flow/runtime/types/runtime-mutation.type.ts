import { FlowRuntimeStatePatch } from '../contracts/runtime-state-patch.interface';
import { FlowRuntimeState }
from '../state/flow-runtime-state';



export type RuntimeMutation =

| {

type:
'REPLACE';

state:
FlowRuntimeState;

}

| {

type:
'PATCH';

patch:
FlowRuntimeStatePatch;

};