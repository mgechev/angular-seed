import {join} from 'path';
import {SeedConfig} from './seed.config';
import {InjectableDependency} from './seed.config.interfaces';

export class ProjectConfig extends SeedConfig {
  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');
  // TEST to add external fonts
  FONTS_DEST = `${this.APP_DEST}/font/roboto`;
  FONTS_SRC = [
      // 'node_modules/bootstrap/dist/fonts/**',
      `${this.ASSETS_SRC}/font/roboto/**`
  ];// End of fonts test

  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';
    let additional_deps: InjectableDependency[] = [
      {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
      {src: 'bootstrap/dist/js/bootstrap.min.js', inject: 'libs'},
      {src: 'bootstrap/dist/css/bootstrap.min.css', inject: true}, // inject into css section
      {src: 'font-awesome/css/font-awesome.min.css', inject: true}, // inject into css section
    ];

    const seedDependencies = this.NPM_DEPENDENCIES;

    this.NPM_DEPENDENCIES = seedDependencies.concat(additional_deps);

    this.APP_ASSETS = [
      // {src: `${this.ASSETS_SRC}/css/toastr.min.css`, inject: true},
      // {src: `${this.APP_DEST}/assets/scss/global.css`, inject: true},
      { src: `${this.ASSETS_SRC}/main.css`, inject: true },
      { src: `${this.ASSETS_SRC}/mdb.css`, inject: true },
      { src: `${this.ASSETS_SRC}/mdb.js`, inject: 'libs' },
    ];

    // Test to add external depependency
    // (<any>this.SYSTEM_CONFIG_DEV.paths)['angular2-jwt'] =
    //     `${this.APP_BASE}node_modules/angular2-jwt/angular2-jwt`;
  }
}
