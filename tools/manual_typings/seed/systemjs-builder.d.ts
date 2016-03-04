declare module 'systemjs-builder' {
  class Builder {
    constructor(configObject?: any, baseUrl?: string, configPath?: string);
    bundle(source: string, target: string, options?: any): Promise<any>;
    buildStatic(source: string, target: string, options?: any): Promise<any>;
  }

  module Builder {}
  export = Builder;
}