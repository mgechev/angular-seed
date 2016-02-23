import {argv} from 'yargs';
import * as gulp from 'gulp';

require('../gulpfile');

const TASK = argv['task'];

console.log('********************************************************************************');
console.log('* angular2-seed tools');
console.log('* task:', TASK);
console.log('********************************************************************************');

gulp.start(TASK);
