export interface WebInjectableDependency {
  src: string;
  inject: string | boolean;
  vendor?: boolean;
  env?: string[] | string;
}
