/**
  * Ideal folder structure for less files
  * --components
  *   -about
  *    -about.html
  *    -about.ts
  *	   -about.less
  * --less   //All common less files go here    
  *   -common.less
  *
  * ===========================================
  * NOTE: To run this task register this tak in gulpfile and 
  *			include it as part of build.assets.dev task
 **/

"use strict";

var less 	= require('gulp-less');
var CONFIG 	= require('../workflow.config');
var path	= require('path');
var chmod	= require('gulp-chmod');

//Less compiler
module.exports = function (gulp) {
  return function () {
    return gulp.src(path.join(CONFIG.APP_SRC,'**','*.less'))
      .pipe(less())
      .pipe(chmod(755))
      .pipe(gulp.dest(path.join(CONFIG.PATH.dest.dev.all)));
  };
};