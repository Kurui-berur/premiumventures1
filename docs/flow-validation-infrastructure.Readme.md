# Consolidation: Concepts Behind PV's Validation Infrastructure

## 1. Overview

We have examined four important areas that will enable us to design and implement validation systems independently:

1. Object relationships and structural integrity.
2. Lookup structures and indexing.
3. Validation architecture and execution flow.
4. Error modelling and reporting.

This document consolidates the concepts we have learned and the architectural decisions we have made for PremiumVentures (PV).

It also distinguishes between decisions that have been settled and implementation details that remain open.

---

## 2. Object Relationships and Structural Integrity

Validating a composed structure requires more than checking whether individual objects exist.

### 2.1. Concepts Learned

| Concept | Meaning | Application in PV |
| --- | --- | --- |
| Object identity | Identifies a particular object. | `FlowNode.id` |
| Reference | Identifies another object. | `nodeDefinitionId` |
| Referential integrity | Ensures references point to valid objects. | A `FlowNode` must reference an existing `NodeDefinition`. |
| Uniqueness constraints | Prevent conflicting identities within an identity scope. | `FlowNode` IDs must be unique within their collection. |
| Dependency relationships | Identify what must be available before another operation can be performed. | `InputBinding` validation depends on resolving its Nodes, Definitions, and Fields. |

### 2.2. Reference Existence vs. Relationship Correctness

A reference can point to an existing object and still establish an invalid relationship.

For example, an `InputBinding` might reference two existing Fields, but:

- The source Field might be `INPUT` instead of `OUTPUT`.
- The target Field might be `OUTPUT` instead of `INPUT`.
- Their data types might be incompatible.

Therefore, structural validation must examine both:

1. Reference existence.
2. Relationship correctness.

**Architectural principle:** A structurally valid reference does not necessarily establish a valid relationship.

---

## 3. Lookup Structures and Indexing

We examined how validators locate objects referenced by other objects.

### 3.1. The Problem

Our `FlowDefinition` stores its structures in arrays.

A validator might locate a `NodeDefinition` using:

```typescript
const definition = flow.nodeDefinitions.find(
  item => item.id === node.nodeDefinitionId
);