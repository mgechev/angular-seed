export interface InjectableDependency {
  src: string;
  inject: string | boolean;
  vendor?: boolean;
  buildType?: string[] | string;

  // @deprecated
  env?: string[] | string;
}

export interface BuildType {
  DEVELOPMENT: string;
  PRODUCTION: string;
  [key: string]: string;
}

export interface ExtendPackages {
  name: string;
  path?: string;
  packageMeta?: any;
}

export interface SourceMapExplorerOutputFormat {
  HTML: string;
  JSON: string;
  TSV: string;
  [key: string]: string;
}
