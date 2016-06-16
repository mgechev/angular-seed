import { join } from 'path';

import { WebConfig } from './web.config';
import { WebInjectableDependency } from './IWebConfig';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides for the web framework.
 * A few examples can be found below.
 */
export class ProjectWebConfig extends WebConfig {

  PROJECT_WEB_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'framework', 'web', 'project');

  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';
    let additional_deps: WebInjectableDependency[] = [
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    const seedDependencies = this.WEB_NPM_DEPENDENCIES;

    this.WEB_NPM_DEPENDENCIES = seedDependencies.concat(additional_deps);

    /* Add to or override NPM module configurations: */
    //this.mergeObject( this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false } );

  }
}
