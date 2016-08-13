// import * as gulp from 'gulp';
// import * as gulpLoadPlugins from 'gulp-load-plugins';
// import { join } from 'path';
//
// import { APP_SRC, APP_TITLE, DOCS_DEST } from '../../config';
//
// const plugins = <any>gulpLoadPlugins();
//
// /**
//  * Executes the build process, building the documentation for the TypeScript
//  * files (excluding spec and e2e-spec files) using `typedoc`.
//  */
// export = () => {
//
//   let src = [
//     'typings/index.d.ts',
//     join(APP_SRC, '**/*.ts'),
//     '!' + join(APP_SRC, '**/*.spec.ts'),
//     '!' + join(APP_SRC, '**/*.e2e-spec.ts')
//   ];
//
//   return gulp.src(src)
//     .pipe(plugins.typedoc({
//       // TypeScript options (see typescript docs)
//       module: 'commonjs',
//       target: 'es5',
//       // excludeExternals: true,
//       includeDeclarations: true,
//       // Output options (see typedoc docs)
//       out: DOCS_DEST,
//       json: join(DOCS_DEST, 'data/docs.json'),
//       name: APP_TITLE,
//       ignoreCompilerErrors: false,
//       experimentalDecorators: true,
//       version: true
//     }));
// };

