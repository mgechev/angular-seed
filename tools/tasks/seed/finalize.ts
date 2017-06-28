/**
 * This task is run at the end of every build (see /tools/config/seed.tasks.json)
 * The task is currently inert (does nothing).
 * You can replace it with your own shutdown task by putting a file at /tools/tasks/project/finalize.ts
 */
export = (done: any) => {
    done();
};
