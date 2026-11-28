# PremiumVentures

## Overview

PremiumVentures is an ongoing software architecture project focused on
designing a generic, domain-agnostic application runtime.

The architecture explores how independently defined flows can be
composed and executed through a shared runtime while keeping domain
logic independent of the underlying execution infrastructure.

## Architecture

The architecture is documented progressively as the system develops.

The following document explains the overall architecture:

- [Overall Architecture](docs/architecture.md)

## Architecture Documentation

The architecture is divided into individual documents, each covering
a particular component, responsibility, or architectural concept.

| Document | Description |
| --- | --- |
| [Overall Architecture](docs/architecture.md) | Explains the complete architecture and how its components relate. |
| [Validation Infrastructure](docs/validation-infrastructure.md) | Explains the concepts and design of the validation infrastructure. |
| [FlowDefinitionValidator Responsibilities](docs/flow-definition-validator-responsibilities.md) | Defines the responsibilities and boundaries of the root validator. |

## Project Status

This is an evolving architecture. Documentation is updated as
concepts are examined, decisions are established, and implementation
progresses.