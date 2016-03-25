declare module "nodegit" {
  interface Clone {
    (reponame: string, destination: string, options?: any): Promise<any>;
  }

  interface NodeGit {
    Clone: Clone;
  }

  var nodegit: NodeGit;
  export = nodegit;

}
