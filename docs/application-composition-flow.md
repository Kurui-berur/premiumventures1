# Application Composition Architecture

## 1. The Central Concept

We are introducing the concept of an **application-composition flow**.

Its purpose is to sit between independently existing flows and the overall application experience.

It allows an application to be constructed from multiple independent flows while preserving their independence.

For example, in eduPV:

- Application shell flow
- Homepage flow
- Lesson flow
- Login flow
- Password-recovery flow
- Profile flow

These flows are designed independently. The application-composition flow brings them together to form the education application.

The composition flow is itself a flow. It has its own structure and execution. It is not simply a static list of pages or a presentation layout.

---

## 2. The Three Architectural Structures

We have identified three distinct structures.

### Structure 1: Application-Composition Flow

Describes and controls the composition of independently existing flows.

### Structure 2: Individual Flows and Their Presentation Schemas

Each flow has its own execution structure and independently associated presentation schema.

### Structure 3: Composition-Level Presentation Schema

Defines the whole application presentation and how individual flow presentations contribute to it.

These structures are related, but they must not be merged.

---

## 3. Application-Composition Flow

The application-composition flow has its own identity and execution.

It sits above the independent flows in the application composition.

For example:

**Education application-composition flow**

- Application shell
- Homepage
- Lesson
- Login
- Password recovery
- Profile

*Illustrative composition relationships, not a proposed PV interface or node structure.*

### Important Characteristics

- The individual flows remain independently defined.
- Their internal nodes, scenes, and execution logic are not copied into the composition flow.
- The composition flow brings flows into the application composition.
- It controls composition progression through its own execution.
- PV executes the composition flow and the participating flows according to their respective definitions.
- PV remains responsible for determining the next Scene to be visualized for each flow.

We have not yet defined exactly how a composition node references, activates, or coordinates another flow.

That remains an investigation.

---

## 4. Individual Flow Presentation Schemas

Each independent flow has an associated presentation schema.

For example:

| Individual Flow | Associated Presentation Schema |
| --- | --- |
| Homepage flow | Homepage presentation |
| Lesson flow | Lesson presentation |
| Login flow | Login presentation |
| Password-recovery flow | Recovery presentation |
| Profile flow | Profile presentation |

Each schema describes the presentation belonging to its flow.

For a login flow, this might include:

- Email field
- Password field
- Remember-me checkbox
- Sign-in button
- Forgot-password link

**The individual schema does not prescribe where it appears in the application.**

This is important for reusability.

The same login flow and presentation schema could be used in two different applications:

- In one application, login appears as a modal.
- In another application, login appears as a full page.

The login schema itself does not need to change.

---

## 5. Composition-Level Presentation Schema

The application-composition flow also has an associated presentation schema.

This schema describes the whole application experience.

For example, the education application's presentation might contain:

- Header region
- Main content region
- Supporting content region
- Modal region
- Footer region

These are presentation structures, not PV Scenes or FlowNodes.

The composition-level schema is responsible for incorporating the individual flow presentations into the whole experience.

### 5.1. The Hybrid Approach We Have Selected

We agreed to combine approaches 2 and 3 from our investigation.

#### Approach 2: References

The composition-level presentation schema references independently defined presentation schemas rather than copying their definitions.

#### Approach 3: Regions and Associations

The composition-level presentation schema defines regions and associates individual presentation contributions with those regions.

Conceptually:

**Education application presentation schema**

| Region | Presentation Contribution |
| --- | --- |
| Header region | Reference: application shell presentation |
| Main content region | Contribution: homepage or lesson presentation |
| Modal region | Contribution: login or recovery presentation |
| Footer region | Not yet specified |

*Conceptual representation of the selected hybrid approach.*

This gives us three important capabilities:

1. The individual schemas remain independently maintained.
2. The composition schema determines the overall presentation structure.
3. Different flow presentations can contribute to different regions as the application composition changes.

We have not yet settled the exact reference format, region structure, or association mechanism.

---

## 6. What Happens When the Application Changes

Our education application example helped us discover that composition is not simply about displaying one page at a time.

Consider these situations.

### Situation A — Student Opens Homepage

- Header: shell presentation
- Main region: homepage presentation

### Situation B — Student Opens a Lesson

- Header: shell presentation
- Main region: lesson presentation

### Situation C — Student Opens Login

- Header: shell presentation
- Main region: homepage presentation
- Modal region: login presentation

### Situation D — Student Selects Forgot Password

- Header: shell presentation
- Main region: homepage presentation
- Modal region: recovery presentation

This demonstrates that the composition-level schema describes a complete experience that can have multiple simultaneous presentation contributions.

A flow can contribute to the experience without occupying the whole screen.

---

## 7. Flow State and Presentation Participation Are Separate

We also clarified an important point about independent flow instances.

An individual flow's state is retained until the management responsible for flow state requests its clearing.

Therefore:

- Removing a flow's presentation from the visible composition does not automatically clear its flow state.
- A flow can retain its execution state while another flow's presentation occupies the same region.
- A previously used flow can contribute again using its retained state.
- Presentation visibility, composition participation, and flow-state retention are distinct concerns.

This is particularly important for login and password recovery.

The login instance can retain its state while the recovery flow is being presented.

---

## 8. Responsibilities and Boundaries

| Component | Responsibility |
| --- | --- |
| PV individual flow | Executes its own flow definition |
| PV composition flow | Executes the application-level composition |
| PV flow-state management | Manages retention and clearing of flow-instance state |
| Individual presentation schema | Describes what an individual flow presents |
| Composition presentation schema | Describes the whole experience and presentation placement |
| Talai | Interprets and composes presentation definitions |
| Angular/React renderer | Renders the resulting presentation |

The fundamental separation remains:

**PV manages flow execution and composition. Talai manages presentation composition and presentation-level interactions.**

The renderer remains independent of both the underlying PV flow model and the presentation definitions.

---

## 9. What Remains to Investigate

We have a conceptual foundation, but we should not jump into TypeScript interfaces yet.

These are the unresolved questions.

| Area | Question |
| --- | --- |
| Composition flow structure | How does a composition node represent or reference an independent flow? |
| Flow participation | How does a flow enter, remain in, or leave a composition? |
| Composition execution | How does the composition flow coordinate independently progressing flows? |
| Schema references | How are individual presentation schemas identified and referenced? |
| Regions | What exactly constitutes a presentation region? |
| Associations | How are active flow presentations associated with regions? |
| Runtime composition | How does Talai resolve the current presentation contributions? |
| Interaction | How do presentation interactions reach the correct participating flow through PV? |