# Consolidating FlowDefinitionValidator Responsibilities

Based on what we've established, the responsibilities of `FlowDefinitionValidator` are as follows.

## 1. Validate FlowDefinition Metadata

The root validator is responsible for validating the metadata of the supplied `FlowDefinition`.

| Property | Validation Rule |
| --- | --- |
| `id` | Must be a non-empty string. Preserve exactly as supplied; comparison is case-sensitive. |
| `version` | Must be a positive integer. No revision-history or progression checks. |
| `name` | Must be a non-empty string. Preserve exactly as supplied; uniqueness is not required. |

## 2. Validate Collection Declarations

The root validator must ensure that all five required collections are explicitly present and are arrays.

| Collection | Required |
| --- | --- |
| `nodeDefinitions` | Yes |
| `nodes` | Yes |
| `scenes` | Yes |
| `transitions` | Yes |
| `inputBindings` | Yes |

Empty arrays are allowed.

The root validator checks that the collections exist and have the correct type. It does not validate their individual entries.

## 3. Coordinate Structural Validation

The root validator coordinates the overall validation process.

Its responsibilities are to:

- Prepare the shared `FlowValidationContext`.
- Coordinate specialized validators.
- Respect validation dependencies.
- Collect independently discoverable issues.
- Avoid running dependent checks when prerequisites are unavailable.
- Aggregate the issues into the final validation result.

The root validator owns the validation process without taking ownership of the internal validation rules of every structure.

## 4. Keep Outside Its Responsibility

The root validator does not:

- Validate individual collection entries internally.
- Validate references declared by individual structures.
- Check field compatibility.
- Determine reachability, cycles, or execution paths.
- Determine runtime success.
- Manage `FlowDefinition` revision history.
- Modify or normalize supplied data.

These responsibilities belong to other parts of the validation architecture or to subsequent stages of processing.

---

## 5. One Remaining Responsibility to Examine

There is a subtle issue: **duplicate IDs within collections.**

For example, two `FlowNode` objects might have the same ID.

We previously established that duplicate IDs must be detected when building lookup indexes, because a `Map` could silently overwrite one entry.

However, we have not formally decided whether duplicate detection is:

1. A direct responsibility of `FlowDefinitionValidator`.
2. A responsibility of the shared context/index-building process, which reports duplicates to the root validator.

### Recommended Approach

I recommend the second approach.

The root coordinates the process, while index construction detects duplicate identities before creating usable lookup indexes.

This preserves the separation between orchestration and lookup preparation.

### 5.1. Why This Boundary Matters

Consider the following example:

```typescript
const nodes = [
  {
    id: 'node-1',
    nodeDefinitionId: 'definition-1'
  },
  {
    id: 'node-1',
    nodeDefinitionId: 'definition-2'
  }
];