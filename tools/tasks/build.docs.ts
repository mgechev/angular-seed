import {join} from 'path';
import {PATH} from '../config';

export = function buildDocs(gulp, plugins, option) {
  return function() {

    let src = [
      join(PATH.src.all, '**/*.ts'),
      '!' + join(PATH.src.all, '**/*_spec.ts')
    ];
     return gulp.src(src)
                .pipe(plugins.typedoc({
                // TypeScript options (see typescript docs) 
                module: 'commonjs',
                target: 'es5',
                includeDeclarations: true,
                // Output options (see typedoc docs) 
                out: PATH.docs,
                json: join(PATH.docs , 'data/docs.json' ),
                // TypeDoc options (see typedoc docs) 
                name: 'Angular 2 Seed Project',
                //theme: "/path/to/my/theme",
                //plugins: ["my", "plugins"],
                ignoreCompilerErrors: false,
                experimentalDecorators: true,
                version: true
            }));
          };
}
