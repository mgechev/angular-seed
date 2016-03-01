import {argv} from 'yargs';
import * as gulp from 'gulp';

require('../gulpfile');

const TASK = argv['task'];

if (!TASK) {
  throw new Error('You must specify a task name.');
}

console.log('**********************');
console.log('* angular2-seed tools ');
console.log('* debugging task:', TASK);
console.log('**********************');

gulp.start(TASK);
