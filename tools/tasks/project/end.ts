/**
 * This task is run at the end of every build. It is currently inert (does nothing)
 * This taskname/filename must be listed within the "finalize" composite task in /tools/config/project.tasks.json
 * Customize it if you require a wrap-up script to run after every build
 */
export = (done: any) => {
    done();
};
