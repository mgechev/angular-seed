const DEFAULT_OPTION = '$$$DEFAULT_OPTION$$$';
class TaskCacheEntry {
  private taskByOptions: { [option: string]: any; };
  constructor() {
    this.taskByOptions = {};
  }
  getTask(option: string) {
    option = option || DEFAULT_OPTION;
    return this.taskByOptions[option];
  }
  setTask(option: string, task: any) {
    option = option || DEFAULT_OPTION;
    this.taskByOptions[option] = task;
  }
}

export class TaskCache {
  private tasks: { [key: string]: TaskCacheEntry; };
  constructor() {
    this.tasks = {};
  }
  setTask(taskname: string, option: string, task: any) {
    let entry = new TaskCacheEntry();
    this.tasks[taskname] = entry;
    entry.setTask(option, task);
  }
  hasTask(taskname: string, option: string) {
    return !!(this.tasks[taskname] && this.tasks[taskname].getTask(option));
  }
  getTask(taskname: string, option: string) {
    if (!this.tasks[taskname]) {
      return undefined;
    }
    return this.tasks[taskname].getTask(option);
  }
}
