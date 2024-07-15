interface NestedObject<T> {
  [key: string]: T | NestedObject<T>;
}

type NestedValue<T> = T | NestedObject<T>;

export type Validator = NestedValue<string | string[] | number>

export enum Models {
  classes = "classes",
  subjects = "subjects",
}
