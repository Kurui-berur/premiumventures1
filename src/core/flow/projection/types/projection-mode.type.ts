export const ProjectionMode={
    CURRENT_SCENE : 'CURRENT_SCENE',
    
} as const
export type ProjectionMode=(typeof ProjectionMode)[keyof typeof ProjectionMode]