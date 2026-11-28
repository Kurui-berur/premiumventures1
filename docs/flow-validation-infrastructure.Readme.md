Consolidation: Concepts Behind PV's Validation Infrastructure
1. Overview
We have examined four important areas that will enable us to design and implement validation systems independently:
1. Object relationships and structural integrity.
2. Lookup structures and indexing.
3. Validation architecture and execution flow.
4. Error modelling and reporting.
This document consolidates the concepts we have learned and the architectural decisions we have made for PremiumVentures (PV).

It also distinguishes between decisions that have been settled and implementation details that remain open.

2. Object Relationships and Structural Integrity
Validating a composed structure requires more than checking whether individual objects exist.
2.1. Concepts Learned
Concept	Meaning	Application in PV
Object identity	Identifies a particular object.	FlowNode.id
Reference	Identifies another object.	nodeDefinitionId
Referential integrity	Ensures references point to valid objects.	A FlowNode must reference an existing NodeDefinition.
Uniqueness constraints	Prevent conflicting identities within an identity scope.	FlowNode IDs must be unique within their collection.
Dependency relationships	Identify what must be available before another operation can be performed.	InputBinding validation depends on resolving its Nodes, Definitions, and Fields.

2.2. Reference Existence vs. Relationship Correctness
A reference can point to an existing object and still establish an invalid relationship.

For example, an InputBinding might reference two existing Fields, but:
- The source Field might be INPUT instead of OUTPUT.
- The target Field might be OUTPUT instead of INPUT.
- Their data types might be incompatible.
Therefore, structural validation must examine both:
1. Reference existence.
2. Relationship correctness.
Architectural principle: A structurally valid reference does not necessarily establish a valid relationship.

3. Lookup Structures and Indexing
We examined how validators locate objects referenced by other objects.
3.1. The Problem
Our FlowDefinition stores its structures in arrays.

A validator might locate a NodeDefinition using:
const definition = flow.nodeDefinitions.find(
  item => item.id === node.nodeDefinitionId
);


This requires searching through the array.

If the collection contains n elements, the worst-case lookup time is O(n).

When many relationships must be resolved, repeatedly searching collections introduces unnecessary work.
3.2. The Solution: Indexing
We can construct Maps from the original collections.
const nodeDefinitionsById = new Map(
  flow.nodeDefinitions.map(definition => [
    definition.id,
    definition
  ])
);


A Map provides approximately O(1) average lookup time.

Instead of repeatedly searching the original array, validators can resolve references through the shared index.
3.3. Important Lessons
- Arrays remain the original source of definitions.
- Maps provide efficient lookup.
- Indexes should be constructed once and shared.
- Duplicate identities must be detected during index construction.
- A Map must not silently overwrite duplicate entries and hide validation problems.
- The original FlowDefinition must remain unchanged.
These principles lead to the shared FlowValidationContext.

4. Validation Architecture and Execution Flow
We examined how a validation system should be organized.

We chose Approach B: A root validator coordinating specialized validators.
4.1. Root-Controlled Orchestration
Decision: Settled

FlowDefinitionValidator owns the validation process.

It determines:
- When validation starts.
- When the validation context is prepared.
- Which specialized validators are invoked.
- How validation dependencies are respected.
- How results are aggregated.
Specialized validators do not independently control the overall validation process.

The root validator provides a single entry point for validating a complete FlowDefinition.

Independent checks may eventually execute concurrently, provided this is safe and beneficial.
4.2. Common Generic Validator Interface
Decision: Settled

All specialized validators will implement a common generic contract.
interface StructureValidator<T> {
  validate(
    structure: T,
    context: FlowValidationContext
  ): ValidationIssue[];
}


This means each validator:
- Receives the structure it is responsible for.
- Receives the shared validation context.
- Returns the issues it discovers.
Examples of specialized validators:
StructureValidator<NodeDefinition>
StructureValidator<FlowNode>
StructureValidator<SceneDefinition>
StructureValidator<FlowTransition>
StructureValidator<InputBinding>


The internal validation rules remain specific to each structure.
4.3. Dependency Injection and Composition
We examined two additional implementation concepts.

Composition

The larger validation system is assembled from smaller validators with distinct responsibilities.

Dependency injection

The root validator receives its specialized validators from outside rather than necessarily constructing them internally.

These are concepts we will use when implementing the architecture.

We have not yet settled the precise dependency registration or construction mechanism.

5. Error Modelling and Reporting
Validation must produce useful diagnostic information, not just a boolean indicating whether a definition is valid.
5.1. Validation Issues vs. Software Exceptions
A missing NodeDefinition reference is an expected validation issue.

An unexpected failure inside the validator is a software exception.

Invalid user-authored definitions should be reported as validation issues rather than treating every violation as an exception.

This distinction separates expected validation outcomes from unexpected software failures.
5.2. Error Codes
Each validation rule can have a stable identifier.

Example:
FLOW_NODE_DEFINITION_NOT_FOUND


A stable error code allows EduPV or another domain application to interpret the issue independently of its displayed wording.

This separates the meaning of a validation issue from how that issue is presented to the user.
5.3. Structural Paths
A path identifies where the problem occurs.

Example:
nodes[2].nodeDefinitionId


This identifies the nodeDefinitionId property of the third FlowNode in the collection.

Structural paths make validation issues easier to locate and resolve.
5.4. Issue Aggregation
Decision: Settled

We chose to collect all independently discoverable issues.

The system should not stop at the first validation problem.

However, when a prerequisite is unavailable, dependent checks should be skipped rather than generating misleading secondary errors.

For example:

If a FlowNode references a nonexistent NodeDefinition, we report the broken reference.

However, we cannot meaningfully validate Fields belonging to that missing definition.

The validator should therefore distinguish between:
- An issue that can be reported independently.
- A dependent check that cannot be performed because its prerequisite is unavailable.
5.5. Severity Classification
We discussed the following possible issue classifications:
- ERROR
- WARNING
- INFO
These are possible issue classifications, but we have not yet settled their full semantics or which structural conditions receive each classification.

6. The Resulting PV Validation Architecture
Combining the concepts, we now have the following proposed architecture.
6.1. FlowDefinitionValidator
Coordinates the entire validation process.

Responsibilities:
- Prepare the validation context.
- Invoke specialized validators.
- Respect validation dependencies.
- Aggregate validation issues.
- Produce the overall validation result.
6.2. FlowValidationContext
Provides shared lookup indexes and access to the original FlowDefinition.

It allows specialized validators to resolve relationships without repeatedly searching the original collections.

The context is intended to be shared across validators rather than independently reconstructed by each validator.
6.3. Specialized Validators
Each specialized validator is responsible for validating a particular structure.
Validator	Responsibility
NodeDefinitionValidator	Validates NodeDefinitions.
FlowNodeValidator	Validates FlowNodes and their relationships.
SceneValidator	Validates SceneDefinitions.
TransitionValidator	Validates FlowTransitions.
InputBindingValidator	Validates InputBindings and their relationships.

Each validator implements the common StructureValidator<T> interface.
6.4. ValidationResult
Represents the outcome of validating a complete FlowDefinition.

It contains the overall validity and the aggregated ValidationIssue collection.

The exact contract remains open.

7. Decisions Register
This section distinguishes between settled architectural decisions and implementation details that remain open.
Area	Current Position
Structural integrity includes relationship correctness	Settled
Shared lookup indexes	Adopted
Duplicate detection during indexing	Required design principle
Root-controlled orchestration	Settled
Specialized validators	Settled
Common generic validator interface	Settled
Validators return ValidationIssue[]	Settled
Collect independently discoverable issues	Settled
Skip checks with unavailable prerequisites	Settled
Dependency injection	Concept understood; implementation open
Parallel validation	Possible optimization; not yet implemented
Severity classification	Open
Exact ValidationIssue contract	Open
Exact FlowValidationContext contract	Open
Exact ValidationResult contract	Open


8. Architectural Principles Established
The following principles summarize the direction of the validation infrastructure.
1. Structural validation must examine relationships, not just object existence.
   
   A reference can be valid while the relationship it establishes is invalid.
2. Reference resolution should use shared indexes.
   
   Validators should not repeatedly search the original collections.
3. Index construction must preserve structural integrity.
   
   Duplicate identities must be detected rather than silently overwritten.
4. The root validator owns the validation process.
   
   Specialized validators focus on their own structures and do not independently orchestrate the complete validation.
5. Validation issues are expected outcomes.
   
   Invalid user-authored definitions should produce diagnostic issues rather than software exceptions.
6. Validation should collect independently discoverable issues.
   
   The system should report multiple problems in one validation run.
7. Dependent checks must respect their prerequisites.
   
   When a prerequisite cannot be resolved, dependent checks should be skipped.
8. The validation architecture should remain composable.
   
   Specialized validators share a common contract while retaining responsibility for their own validation rules.
9. Implementation details remain separate from established architectural decisions.
   
   Dependency registration, parallel execution, severity semantics, and exact result contracts remain open until they are explicitly settled.

9. Current Status
We have established the conceptual foundation and proposed architecture for PV's validation infrastructure.

The next stage is to define the exact contracts for:
- ValidationIssue
- ValidationResult
- FlowValidationContext
Once these contracts are established, we can implement the validation infrastructure while preserving the architectural principles and decisions documented here.