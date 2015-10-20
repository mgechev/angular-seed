// Very bad one but fix compiler complaints.
declare module ng {
  var DOM: any;
}

declare module "angular2/src/core/dom/dom_adapter" {
  export = ng;
}
