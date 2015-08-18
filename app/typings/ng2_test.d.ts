// Very bad one bud fix compiler complaints.
declare module ng {
  var AsyncTestCompleter;
  class TestComponentBuilder {
    overrideTemplate(cmp: Type, html: string): any;
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
}

declare module "angular2/test" {
  export = ng;
}
