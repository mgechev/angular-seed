export * from "./utils/template_injectables";
export * from "./utils/template_locals";
export * from "./utils/tasks_tools";
export * from "./utils/server";

export function tsProjectFn(plugins) {
  return plugins.typescript.createProject("tsconfig.json", {
    typescript: require("typescript")
  });
}
