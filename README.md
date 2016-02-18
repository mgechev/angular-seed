
NG2 + Redux + ag-grid testdrive 

this is only a test fork. Don't expect this to be stable, maintained or anything else ...

# How to start

**Note** that this seed project requires node v4.x.x or higher and npm 2.14.7.

You must have `ts-node` installed as global. If you don't, use (as root - sudo):

```bash
npm install -g ts-node
```

In order to start the test drive use:


```bash
git clone https://github.com/dellfort/angular2-redux-ag-grid
cd angular2-redux-ag-grid
# checkout development branch - master will only be updated occasionally
git checkout develop
# install the project's dependencies
npm install
# watches your files and uses livereload by default:
npm start

```

When installing a dependency without type definitions use the typings library to install the matching d.ts:


```bash
# the usual npm install with save parameter to add lib to package.json:
npm install name-of-dependency --save

# use typings to search for available libraries:
typings search ag-grid --ambient
# install via typings, you have to confitm installation by typing 'Y'
typings install ag-grid --ambient --save

```
