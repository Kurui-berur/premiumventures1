export  const ProjectionScope={
     ACTIVE_SCENE: 'ACTIVE_SCENE',
     SEED:'SEED',
     GRAPH:'GRAPH',
     CANDIDATE_NODES:'CANDIDATE_NODES',
     NODES:'NODES',
     FLOW_VIEW:'FLOW_VIEW'
}
export type ProjectionScope=(typeof ProjectionScope)[keyof typeof ProjectionScope]