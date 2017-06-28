/**
 * This task is run at the start of every build. It is currently inert (does nothing)
 * This taskname/filename must be listed within the "initialize" composite task in /tools/config/project.tasks.json
 * Customize it if you require a startup script to run before every build
 */
export = (done: any) => {
    done();
};
