/**
 * Describes the data type of information a Field can receive or produce.
 */
export type FieldDataType =
  | {
      /** A textual value. */
      kind: "STRING";
    }
  | {
      /** A numeric value. */
      kind: "NUMBER";
    }
  | {
      /** A true or false value. */
      kind: "BOOLEAN";
    }
  | {
      /** A calendar date. */
      kind: "DATE";
    }
  | {
      /** A date and time. */
      kind: "DATETIME";
    }
  | {
      /**
       * An inline object whose properties are described directly.
       */
      kind: "OBJECT";
      properties: Record<string, FieldDataType>;
    }
  | {
      /**
       * A collection of values sharing the declared item type.
       */
      kind: "ARRAY";
      items: FieldDataType;
    }
  | {
      /**
       * References a reusable, domain-defined object type.
       *
       * PV can recognise and carry the object without needing
       * to understand its domain-specific meaning.
       */
      kind: "CUSTOM_OBJECT";
      typeId: string;
      version: number;
    };