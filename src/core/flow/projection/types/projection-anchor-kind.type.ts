export const ProjectionAnchorKind = {

    SCENE: 'SCENE',

    FLOW: 'FLOW',

    BRANCH: 'BRANCH',



} as const;

export type ProjectionAnchorKind =

  (typeof ProjectionAnchorKind) [keyof typeof ProjectionAnchorKind];