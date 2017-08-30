import { argv } from 'yargs';
import * as runSequence from 'run-sequence';

require('../gulpfile');

const TASK = argv['task'];

if (!TASK) {
  throw new Error('You must specify a task name.');
}

console.log('**********************');
console.log('* angular-seed tools ');
console.log('* debugging task:', TASK);
console.log('**********************');

runSequence(TASK);
