export * from "./blogType";
export * from "./projectType";
export * from "./skillType";
export * from "./userType";

export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;
