// Very bad one bud fix compiler complaints.
declare module ng {
  var AsyncTestCompleter;
  class TestComponentBuilder {
    overrideTemplate(cmp: any, html: string): any;
    createAsync(cmp: any)
    apply(): any;
  }
  var By;
  var beforeEach;
  var ddescribe;
  var describe;
  var el;
  var expect;
  var iit;
  var inject;
  var it;
  var xit;

  var DOM: any;
}

declare module "angular2/test" {
  export = ng;
}

declare module "angular2/src/core/dom/dom_adapter" {
  export = ng;
}
