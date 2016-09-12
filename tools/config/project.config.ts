import { join } from 'path';
import { readFileSync } from 'fs';
import { SeedConfig } from './seed.config';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR    = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');
  PACKAGE_FILE         = 'package.json';
  RELEASE_DIR          = 'release/';
  CHANGELOG_FILE       = 'CHANGELOG.md';
  ENABLE_SCSS          = true;

  private _pkg: any;

  constructor() {

    super();

    // this.APP_TITLE = 'Put name of your app here';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });

    this._pkg = JSON.parse(readFileSync('package.json').toString());
  }

  get GIT_CONFIG():any {
      return {
        release_commit_message: 'chore(deploy): v' + this.appVersionSync + '. [skip ci]',
        release_tag: 'v' + this.appVersionSync,
        release_tag_title: 'release',
        release_push_branch: 'master',
        release_push_origin: 'origin',
      };
  };

  get CSS_PROD_BUNDLE():string {
    return this.appName + '.' + this.appVersionSync + '.css';
  }

  get JS_PROD_APP_BUNDLE():string {
    return this.appName + '.' + this.appVersionSync + '.js';
  }

  get JS_PROD_SHIMS_BUNDLE():string {
    return this.appName + '.' + this.appVersionSync + '.vendor.js';
  }

  /**
   * Returns the applications version as defined in the `package.json`.
   * @return {number} The applications version.
   */
  get appVersionSync(): number | string {
    return JSON.parse(readFileSync('package.json').toString()).version;
  }

  get appVersion(): number | string {
    return this._pkg.version;
  }

  get appName(): string {
      return this._pkg.name;
  }

}
