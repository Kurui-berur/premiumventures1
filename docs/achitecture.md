# PremiumVentures (PV) — Flow Architecture and Composition

## 1. Purpose and Scope

This document consolidates the foundational concepts and structural composition of a flow within PremiumVentures.

It describes what a flow represents, what it contains, how its elements relate to one another, and how those elements contribute to the execution of a process.

The objective is to establish a clear structural foundation before defining the runtime, execution mechanisms, storage, or presentation system.

The current focus is **Flow Composition**: combining reusable Node responsibilities into a particular process definition.

## 2. Core Architectural Concepts

| Concept | Definition |
|---|---|
| **Flow** | A structured representation of a process, describing its responsibilities and permitted execution paths towards an objective. |
| **FlowDefinition** | The reusable, domain-authored representation of a process and its permitted execution paths. |
| **Graph** | The structural representation of FlowNodes and their transitions. |
| **NodeDefinition** | A reusable description of a Node responsibility, its Fields, possible outcomes, and capability requirement. |
| **FlowNode** | A particular use of a NodeDefinition within a FlowDefinition. |
| **SceneDefinition** | A logical grouping of FlowNodes belonging to a particular stage or context of a flow. |
| **Field** | A named data element describing information a Node requires or produces. |
| **Outcome** | A possible result of fulfilling a Node's responsibility. |
| **FlowTransition** | A directed relationship between FlowNodes that defines permitted execution progression. |
| **InputBinding** | A connection between a Node input Field and the source of its data. |
| **FlowInstance** | An independent execution of a FlowDefinition. |
| **Execution State** | The context and state accumulated during a FlowInstance's execution. |
| **Scene Projection** | A presentation-oriented representation of the current scene. |

The terms above describe different architectural concerns. They should not be treated as interchangeable.

## 3. What a Flow Represents

A flow is a structured representation of a process. It describes the responsibilities involved, the logical stages of the process, and the permitted paths towards an objective.

A flow provides the structure through which a process can be represented and executed.

For example, a login process has the objective of establishing whether a user can be authenticated.

Its flow describes:

- The responsibilities involved in authentication.
- The logical stages of the process.
- The information required and produced by those responsibilities.
- The possible outcomes.
- The permitted paths between responsibilities.
- The points at which execution can begin or finish.

The flow describes the structure of the process, rather than the implementation of each responsibility.

### 3.1 FlowDefinition

A FlowDefinition describes what a process should look like before an instance of that process is executed.

It identifies:

- The process and its objective.
- The reusable NodeDefinitions used by the flow.
- The particular FlowNodes that compose the process.
- The logical grouping of FlowNodes into scenes.
- The permitted transitions between FlowNodes.
- The entry and terminal designations.
- The data relationships that supply Node input Fields.

The FlowDefinition describes the composition. It does not itself execute the process.

### 3.2 Conceptual Structure

```text
FLOW DEFINITION
│
├── Identity
├── Objective
├── NodeDefinitions
├── FlowNodes
│   ├── FlowNode A
│   ├── FlowNode B
│   └── FlowNode C
├── Scenes
│   ├── Scene A
│   └── Scene B
├── Transitions
│   ├── Source FlowNode → Target FlowNode
│   └── Source FlowNode → Target FlowNode
├── Entry Designations
└── Terminal Designations
```

This is a conceptual illustration, not a declaration of the final PV data model.

## 4. NodeDefinition — Reusable Responsibility

A NodeDefinition describes a reusable responsibility within a domain.

It describes the information the Node receives and produces, its possible outcomes, and any capability required to perform its responsibility.

```typescript
/**
 * Defines a reusable responsibility within a domain.
 *
 * Describes the information the Node receives and produces,
 * its possible outcomes, and any capability required
 * to perform its responsibility.
 */
interface NodeDefinition {
  /** Unique identity of this NodeDefinition within its domain. */
  id: string;

  /** Version of this NodeDefinition contract. */
  version: number;

  /** Human-readable name of the responsibility. */
  name: string;

  /** Description of the responsibility performed by the Node. */
  description: string;

  /** Fields describing the information received and produced. */
  fields: FieldDefinition[];

  /** Possible outcomes produced by the Node's responsibility. */
  outcomes: NodeOutcomeDefinition[];

  /** Capability contract required to perform the responsibility, if any. */
  capability?: CapabilityRequirement;
}
```

### 4.1 Established Principles

- A NodeDefinition is reusable.
- Multiple FlowNodes may reference the same NodeDefinition.
- Fields describe information, not necessarily visual controls.
- Fields have `INPUT` or `OUTPUT` direction.
- Outcomes describe possible results, not execution transitions.
- A Node declares a capability requirement, not a particular implementation.
- The domain supplies compatible capability implementations.
- The current composition model does not include an interaction requirement in `NodeDefinition`.

### 4.2 Node Responsibility

A Node represents a distinguishable unit of responsibility within a flow.

A Node should represent a responsibility, not merely an individual field, button, or interface element.

A Node's identity comes from its responsibility, not from its Fields or the interface used to expose it.

For example, within a login process:

| Node | Responsibility |
|---|---|
| Credential Input | Obtain the username and password required for authentication. |
| Credential Validation | Validate that the supplied credentials meet the required input criteria. |
| Authentication Decision | Invoke an authentication service and interpret its response. |
| Login Success | Establish a successful login result. |
| Login Failure | Establish an unsuccessful login result. |

These are distinguishable responsibilities within the process.

## 5. FlowNode — A Particular Use of a NodeDefinition

A FlowNode represents a particular use of a reusable NodeDefinition within a FlowDefinition.

Multiple FlowNodes may reference the same NodeDefinition. Each FlowNode has its own identity within the FlowDefinition.

```typescript
/**
 * Represents a particular use of a reusable NodeDefinition
 * within a FlowDefinition.
 *
 * Multiple FlowNodes may reference the same NodeDefinition.
 * Each FlowNode has its own identity within the FlowDefinition.
 */
interface FlowNode {
  /** Unique identity of this Node use within the FlowDefinition. */
  id: string;

  /** Identifies the reusable NodeDefinition whose responsibility this FlowNode uses. */
  nodeDefinitionId: string;

  /** Indicates whether this FlowNode is an entry point at which FlowInstance execution may begin. */
  isEntryPoint?: boolean;

  /** Indicates whether successful completion of this FlowNode completes the FlowInstance. */
  isTerminalPoint?: boolean;
}
```

### 5.1 Decisions Established

1. A FlowNode references a NodeDefinition.
2. Multiple FlowNodes can reference the same NodeDefinition, even within one Flow.
3. Each FlowNode has its own identity.
4. A general `configuration` property is not required at this stage.
5. Entry and terminal designations belong to FlowNode, not NodeDefinition.
6. A Flow can have multiple entry points and multiple terminal points.
7. A Node can be both entry and terminal, or neither.

Configuration should not be added merely because it might become useful later.

## 6. SceneDefinition — Grouping FlowNodes

A Scene is a logical grouping of FlowNodes within a FlowDefinition.

A Scene is not an execution instruction.

```typescript
/**
 * Represents a logical grouping of FlowNodes within a FlowDefinition.
 *
 * Scene membership does not prescribe Node instantiation,
 * execution order, or simultaneous execution.
 */
interface SceneDefinition {
  /** Unique identity of this Scene within the FlowDefinition. */
  id: string;

  /** Identifies the FlowNodes belonging to this Scene. */
  nodeIds: string[];
}
```

### 6.1 Scene Membership and Execution Order

- `nodeIds` contains FlowNode IDs, not NodeDefinition IDs.
- A Scene does not own Node responsibilities.
- A Scene can contain one or multiple FlowNodes.
- Scene membership does not mean simultaneous execution.
- Scene membership does not establish execution order.
- Nodes can belong to the same Scene even when one consumes information produced by another.
- Transitions can connect FlowNodes within the same Scene or across different Scenes.
- Execution progression is defined separately through transitions.

This supports the intention that PV can execute Nodes individually as the user progresses through a flow, without instantiating every Node at the beginning.

### 6.2 Scene and Presentation

A Scene does not necessarily mean a screen.

Whether a Scene is displayed as one screen, multiple screens, or another presentation format is a presentation decision.

The Scene identifies the logical execution context. The presentation system determines how that context is exposed to a user or another consumer.

For now, a Scene should be understood as a logical grouping of FlowNodes within the flow graph.

## 7. FlowTransition — Execution Progression

FlowTransitions belong to the FlowDefinition because they describe how a particular composition progresses.

A transition connects:

- A source FlowNode.
- An outcome declared by that FlowNode's NodeDefinition.
- A target FlowNode.

```typescript
/**
 * Represents an execution transition between two FlowNodes
 * within a FlowDefinition.
 *
 * A transition is activated by a specific outcome produced
 * by its source FlowNode.
 *
 * The transition belongs to the FlowDefinition because
 * execution progression is specific to the composed Flow.
 */
interface FlowTransition {
  /** Unique identity of this transition within the FlowDefinition. */
  id: string;

  /** Identifies the FlowNode whose execution produces the activating outcome. */
  sourceNodeId: string;

  /** Identifies the outcome declared by the source NodeDefinition. */
  outcomeId: string;

  /** Identifies the FlowNode to which execution proceeds. */
  targetNodeId: string;
}
```

### 7.1 Why the Transition Belongs to the FlowDefinition

The transition does not belong to the reusable NodeDefinition.

Another Flow may use the same NodeDefinition but direct its successful outcome to a different FlowNode.

The transition therefore belongs to the Flow composition.

For example:

```text
SubmitRegistration
        |
        | outcome: REGISTRATION_SUCCEEDED
        |
        v
DisplayConfirmation
```

The source NodeDefinition describes the reusable registration responsibility and its possible outcomes. The FlowTransition describes where this particular flow proceeds when the relevant outcome occurs.

Conditional transitions, priorities, and the handling of multiple matching transitions have not yet been fully settled.

## 8. Field Concept

A Field is a named data element within a Node that identifies a particular piece of information the Node requires, collects, exposes, or maintains in fulfilling its responsibility.

Fields describe information consumed or produced by a Node, not just information entered by a user.

### 8.1 Field Properties

| Property | Purpose |
|---|---|
| Name | Identifies the Field. |
| Type | Defines the kind of data it represents. |
| Required | Indicates whether the information is necessary. |
| Constraints | Defines acceptable structural or value conditions. |
| Value | The actual information associated with the Field. |

These properties describe the Field and its information requirements.

The value and source of a Field may also be relevant to an individual execution. Such runtime information does not necessarily belong in the basic Field definition.

### 8.2 Information Consumed and Produced by Nodes

A Node may:

- Consume information supplied by another Node or external system.
- Collect information directly from a user.
- Expose information to subsequent Nodes.
- Maintain information generated during its execution.

Therefore, Fields can describe both information consumed and information produced by a Node.

### 8.3 Field Direction

| Direction | Meaning |
|---|---|
| `INPUT` | Information required or consumed by the Node. |
| `OUTPUT` | Information produced or exposed by the Node. |

A Field's direction describes its relationship with the Node, not whether the information originates from a user.

### 8.4 Field Illustration

```text
Field: username

Name: username
Type: String
Direction: INPUT
Required: true
```

A runtime illustration might look like:

| Property | Example |
|---|---|
| Name | username |
| Value | geofrey@example.com |
| Source | Credential Input user interaction |

The value and source above illustrate runtime information. They are not necessarily part of the basic Field definition.

## 9. Outcome Concept

An Outcome represents a possible business result of fulfilling a Node's responsibility.

A Node can declare multiple possible outcomes, but an actual execution produces a particular result.

An Outcome describes the result of a responsibility. It does not itself define the transition that follows.

For example, an Authentication Decision Node may declare:

```text
Authentication Decision
│
└── Possible Business Outcomes
    ├── SUCCESS
    ├── INVALID_CREDENTIALS
    ├── ACCOUNT_LOCKED
    └── ACCOUNT_DISABLED
```

These are possible outcomes.

An actual execution produces one particular result, which PV can use to evaluate the relevant transitions.

## 10. InputBinding — Connecting Input Data

A Node's input Field can obtain its value from:

1. Another FlowNode's output Field.
2. FlowInstance context.

A separate Domain Data Provider is not necessary for the initial architecture. A domain capability can retrieve data internally when that retrieval is part of its responsibility.

### 10.1 Field Reference

```typescript
/**
 * Identifies a Field belonging to a particular FlowNode
 * within a FlowDefinition.
 */
interface NodeFieldReference {
  /** Identifies the FlowNode that owns the referenced Field. */
  nodeId: string;

  /** Identifies the Field within the referenced NodeDefinition. */
  fieldId: string;
}
```

### 10.2 Node Output Source

```typescript
/**
 * Identifies a value produced by an output Field
 * of another FlowNode.
 */
interface NodeOutputSource {
  /** Identifies this source as another Node's output. */
  kind: "NODE_OUTPUT";

  /** Identifies the source FlowNode and its output Field. */
  reference: NodeFieldReference;
}
```

### 10.3 FlowInstance Context Source

```typescript
/**
 * Identifies a value supplied through the FlowInstance context.
 */
interface FlowContextSource {
  /** Identifies this source as FlowInstance context data. */
  kind: "FLOW_CONTEXT";

  /** Identifies the context entry containing the required value. */
  key: string;
}
```

### 10.4 Input Source Union

```typescript
/**
 * Describes the supported sources from which
 * a Node input Field can receive its value.
 */
type InputBindingSource =
  | NodeOutputSource
  | FlowContextSource;
```

### 10.5 InputBinding

```typescript
/**
 * Connects a source of data to an input Field
 * of a particular FlowNode.
 *
 * Describes the data relationship, not the runtime value.
 *
 * Each target input Field may have at most one
 * InputBinding within a FlowDefinition.
 */
interface InputBinding {
  /** Identifies the source of the input value. */
  source: InputBindingSource;

  /** Identifies the destination FlowNode and its input Field. */
  target: NodeFieldReference;
}
```

### 10.6 Decisions Established for InputBinding

| Question | Decision |
|---|---|
| Can a source be another Node? | Yes |
| Can a source be FlowInstance context? | Yes |
| Can a target be an output Field? | No, target must be INPUT |
| Can a source Node Field be INPUT? | No, source must be OUTPUT |
| Can one input have multiple bindings? | No |
| Can an input have no binding? | Yes |
| Does InputBinding store actual values? | No |
| Do we need a separate static-value source? | No |
| Do we need a separate domain data provider? | No |

Multiple required values should be represented by separate input Fields, or by an `OBJECT` or `ARRAY` Field where appropriate.

## 11. Entry and Terminal Designations

### 11.1 Entry Points

An entry point identifies a FlowNode at which a FlowInstance execution is permitted to begin.

### 11.2 Terminal Points

A terminal point identifies a FlowNode at which a FlowInstance execution can finish.

### 11.3 Architectural Principles

Entry and terminal points are designations attached to FlowNodes, not independent Node types or Scenes.

- A Flow may have multiple entry points.
- A Flow may have multiple terminal points.
- Entry and terminal points refer to FlowNodes.
- A FlowNode may be both an entry point and a terminal point.
- A FlowNode can be neither.
- A Node's responsibility does not change because it receives one of these designations.

The designation describes the Node's relationship with the Flow's starting or finishing conditions. It does not change what the Node is responsible for accomplishing.

## 12. Complete FlowDefinition

Putting the composition structures together:

```typescript
/**
 * Defines a reusable domain-authored flow.
 *
 * FlowDefinition brings together reusable NodeDefinitions,
 * Flow-specific Node uses, Scene groupings, execution
 * transitions and input data bindings.
 *
 * PV interprets and coordinates this definition without
 * owning the domain-specific responsibilities of its Nodes.
 */
interface FlowDefinition {
  /** Unique identity of the FlowDefinition. */
  id: string;

  /** Version of the FlowDefinition. */
  version: number;

  /** Human-readable name of the FlowDefinition. */
  name: string;

  /** Reusable NodeDefinitions referenced by this Flow. */
  nodeDefinitions: NodeDefinition[];

  /** Flow-specific uses of the reusable NodeDefinitions. */
  nodes: FlowNode[];

  /** Logical groupings of FlowNodes within the Flow. */
  scenes: SceneDefinition[];

  /** Execution transitions between FlowNodes. */
  transitions: FlowTransition[];

  /** Connections between input Fields and their data sources. */
  inputBindings: InputBinding[];
}
```

The Flow objective is part of the conceptual description of a process. Its precise representation in the `FlowDefinition` schema has not yet been settled.

## 13. How the Structures Work Together — Login Example

Consider a login process with the objective:

**Establish whether a user can successfully authenticate.**

The flow can be organised into three Scenes.

### Scene 1 — Credential Collection

**FlowNode: CredentialInput**

NodeDefinition: Credential Input

Responsibility: Obtain the username and password required for authentication.

Fields:

- `username`
- `password`

Possible outcomes:

- `SUCCESS`
- `INPUT_INCOMPLETE`

Entry point: Yes

**FlowNode: CredentialValidation**

NodeDefinition: Credential Validation

Responsibility: Validate that the supplied credentials meet the required input criteria.

### Scene 2 — Authentication

**FlowNode: AuthenticationDecision**

NodeDefinition: Authentication Decision

Responsibility: Invoke an authentication service and interpret its response.

Input Fields:

- `username`
- `password`

Output Fields:

- `authenticationResult`
- `identityReference`

Possible outcomes:

- `SUCCESS`
- `INVALID_CREDENTIALS`
- `ACCOUNT_LOCKED`
- `ACCOUNT_DISABLED`

Conditional transitions are evaluated according to the authentication result.

### Scene 3 — Login Outcome

**FlowNode: LoginSuccess**

NodeDefinition: Login Success

Responsibility: Establish a successful login result.

Terminal point: Yes

**FlowNode: LoginFailure**

NodeDefinition: Login Failure

Responsibility: Establish an unsuccessful login result.

Terminal point: Yes

### 13.1 Structural Illustration

```text
LOGIN FLOW
Objective: Establish whether a user can authenticate.

├── Scene 1: Credential Collection
│   ├── Credential Input
│   │   ├── Fields: username, password
│   │   └── Entry Point
│   │
│   └── Credential Validation
│
│       Transition
│
├── Scene 2: Authentication
│   └── Authentication Decision
│       ├── Inputs: username, password
│       ├── Outputs: authenticationResult,
│       │           identityReference
│       └── Conditional Transitions
│
│           ├── SUCCESS
│           └── FAILURE
│
└── Scene 3: Login Outcome
    ├── Login Success
    │   └── Terminal Point
    │
    └── Login Failure
        └── Terminal Point
```

This illustration shows the relationship between Scenes, FlowNodes, Fields, outcomes, transitions and Node designations.

It is a conceptual illustration. The exact NodeDefinitions, transition structure and execution interface remain subject to further architectural decisions.

## 14. What a FlowDefinition Does Not Define

A FlowDefinition does not, by itself, describe:

- The actual implementation code for each Node.
- The mechanism for invoking external services.
- The user interface used to collect or display information.
- The storage mechanism for execution data.
- The runtime mechanism for evaluating transitions.
- The security mechanisms that authorise access to information and capabilities.

These are separate concerns that PV must address through its architecture.

For example, the Authentication Decision Node represents a responsibility. Its implementation performs that responsibility using an authentication service.

The flow describes where that responsibility belongs and how its result relates to the rest of the process.

## 15. What Happens After Composition?

The boundary between defining a flow and running it must be preserved.

1. **NodeDefinition foundation**  
   Defines reusable Node responsibilities.

2. **Flow Composition**  
   Assembles NodeDefinitions, FlowNodes, Scenes, transitions and InputBindings.

3. **Flow validation and compilation**  
   GraphCore validates structural relationships and prepares the Flow for execution.

4. **FlowInstance creation**  
   A particular running instance is created from a FlowDefinition.

5. **Node instantiation and preparation**  
   Individual Nodes are instantiated as needed, with capability resolution and input preparation.

6. **Node execution**  
   PV coordinates execution, records outcomes and evaluates transitions.

7. **Navigation and recovery**  
   Supports forward/backward navigation and recovery of execution state.

## 16. Architectural Decisions Established

| Question | Conclusion |
|---|---|
| Can a Flow have multiple Scenes? | Yes. |
| Can a Scene contain multiple FlowNodes? | Yes. |
| Does a Scene prescribe execution order? | No. |
| Can transitions connect FlowNodes within the same Scene? | Yes. |
| Can transitions cross Scene boundaries? | Yes. |
| Can Nodes consume information produced by other Nodes? | Yes. |
| Can a Node have input Fields, output Fields, both or neither? | Yes. |
| Are Fields limited to information entered by a user? | No. |
| Is a button necessarily a Node? | No. |
| Does a Node's identity come from its Fields? | No. |
| Can a Flow have multiple entry points? | Yes. |
| Can a Flow have multiple terminal points? | Yes. |
| Can one FlowNode be both an entry and terminal point? | Yes. |
| Are entry points separate Node types? | No. |
| Are terminal points separate Node types? | No. |
| Does the FlowDefinition contain the executable implementation of a Node? | No. |
| Does InputBinding store runtime values? | No. |
| Can one input Field have multiple InputBindings? | No. |
| Does Scene membership prescribe simultaneous execution? | No. |

## 17. Remaining Architectural Questions

The structural foundation is becoming clearer, but the FlowDefinition is not yet complete.

### 17.1 Flow Identity and Versioning

How do we distinguish one FlowDefinition from another and represent changes to its structure?

### 17.2 Transition Structure

What exactly must a transition identify beyond its source, target and activating outcome? How should conditional transitions and priorities be represented?

### 17.3 Flow Validity

What makes a Flow structurally valid before it can be used?

### 17.4 Node and Field Constraints

What rules govern the relationship between a Node's responsibility, its Fields and its outcomes?

### 17.5 Missing or Unresolved Inputs

What happens when an input Field has no binding or its value is not available?

### 17.6 Input Type Compatibility

How should validation determine whether the source Field is compatible with the target input Field?

### 17.7 Execution Boundaries

What does it mean for a Node to be completed, and how does that completion relate to the evaluation of transitions?

### 17.8 Runtime NodeInstance Structure

What information belongs to a NodeInstance during execution, and how does it relate to the FlowDefinition?

These questions should be resolved before treating the FlowDefinition as a complete structural model.

The next architectural step is to examine **Flow Validity**. This will help determine whether the structure defined here is sufficient and whether its elements have clear relationships and constraints.

**Important boundary:** Flow composition defines relationships; it does not execute them. It does not create NodeInstances, retrieve runtime values, invoke capabilities or decide how the user navigates backward.