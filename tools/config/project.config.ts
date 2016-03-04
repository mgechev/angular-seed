import {join} from 'path';
import {SeedConfig} from './seed.config';

export class ProjectConfig extends SeedConfig {
  PROJECT_TASKS_DIR    = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');
  SAMPLE_VALUE         = `${this.DIST_DIR}/sample val`;

  // TODO: Add commented lines with examples about how to extend
  //   * SystemJS config / build config
  //   * NPM / Assets deps
}
