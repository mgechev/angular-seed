/**
 * Base class for all tasks.
 */
export abstract class Task {
  /**
   * Override this task if you want to implement some custom
   * task activation mechanism. By default each task will be always executed.
   *
   * @param {string[]} files A list of files changed since the previous watch.
   */
  shallRun(files: string[]): boolean {
    return true;
  }

  /**
   * Implements your task behavior.
   *
   * @param {any} done A function which should be activated once your task completes.
   * @return {ReadWriteStream | Promise<any> | void} This method can either return a promise
   * which should be resolved once your task execution completes, a stream
   * which should throw an end event once your task execution completes
   * or nothing in case you will manually invoke the `done` method.
   */
  abstract run(done?: any, files?: string[]): any | Promise<any> | void;
}
