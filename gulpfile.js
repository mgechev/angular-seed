'use strict';

var gulp = require('gulp');
var bump = require('gulp-bump');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var inject = require('gulp-inject');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var template = require('gulp-template');
var tsc = require('gulp-typescript');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

var Builder = require('systemjs-builder');
var del = require('del');
var fs = require('fs');
var path = require('path');
var join = path.join;
var runSequence = require('run-sequence');
var semver = require('semver');
var series = require('stream-series');

var express = require('express');
var serveStatic = require('serve-static');
var openResource = require('open');

var tinylr = require('tiny-lr')();
var connectLivereload = require('connect-livereload');

// --------------
// Configuration.
var APP_BASE = '/';
var APP_SRC = 'app';
var APP_DEST = 'dist';

var PATH = {
  dest: {
    all: APP_DEST,
    dev: {
      all: join(APP_DEST, '/dev'),
      lib: join(APP_DEST, '/dev/lib')
    },
    prod: {
      all: join(APP_DEST, '/prod'),
      lib: join(APP_DEST, '/prod/lib')
    }
  },
  src: {
    all: APP_SRC,
    loader: [
      './node_modules/angular2/node_modules/traceur/bin/traceur-runtime.js',
      './node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js',
      './node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js.map',
      './node_modules/reflect-metadata/Reflect.js',
      './node_modules/reflect-metadata/Reflect.js.map',
      './node_modules/systemjs/dist/system.src.js'
    ],
    loaderConfig: [
      join(APP_SRC, '/system.config.js')
    ],
// Order is quite important here for the HTML tag injection.
    angular: [
      './node_modules/angular2/bundles/angular2.dev.js',
      './node_modules/angular2/bundles/router.dev.js'
    ]
  }
};

PATH.src.lib = PATH.src.loader
    .concat(PATH.src.loaderConfig)
    .concat(PATH.src.angular);

var PORT = 5555;
var LIVE_RELOAD_PORT = 4002;

var appProdBuilder = new Builder({
  baseURL: 'file:./tmp',
  meta: {
    'angular2/angular2': { build: false },
    'angular2/router': { build: false }
  }
});

var HTMLMinifierOpts = { conditionals: true };

var tsProject = tsc.createProject('tsconfig.json', {
  typescript: require('typescript')
});

var semverReleases = ['major', 'premajor', 'minor', 'preminor', 'patch',
  'prepatch', 'prerelease'];

// --------------
// Clean.

gulp.task('clean', function(done) {
  del(PATH.dest.all, done);
});

gulp.task('clean.dev', function(done) {
  del(PATH.dest.dev.all, done);
});

gulp.task('clean.app.dev', function(done) {
// TODO: rework this part.
  del([join(PATH.dest.dev.all, '**/*'), join('!', PATH.dest.dev.lib)
    , '!' + join(PATH.dest.dev.lib, '*')], done);
});

gulp.task('clean.prod', function(done) {
  del(PATH.dest.prod.all, done);
});

gulp.task('clean.app.prod', function(done) {
// TODO: rework this part.
  del([join(PATH.dest.prod.all, '**/*'), '!' +
  PATH.dest.prod.lib, '!' + join(PATH.dest.prod.lib, '*')], done);
});

gulp.task('clean.tmp', function(done) {
  del('tmp', done);
});

// --------------
// Build dev.

gulp.task('build.lib.dev', function() {
  return gulp.src(PATH.src.lib)
    .pipe(gulp.dest(PATH.dest.dev.lib));
});

gulp.task('build.js.dev', function() {
  var result = gulp.src(join(PATH.src.all, '/**/*ts'))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject));

  return result.js
    .pipe(sourcemaps.write())
    .pipe(template(templateLocals()))
    .pipe(gulp.dest(PATH.dest.dev.all));
});

gulp.task('build.assets.dev', ['build.js.dev'], function() {
  return gulp.src([join(PATH.src.all, '/**/*.html'), join(PATH.src.all, '/**/*.css')])
    .pipe(gulp.dest(PATH.dest.dev.all));
});

gulp.task('build.index.dev', function() {
  var target = gulp.src(injectableDevAssetsRef(), { read: false });
  console.log(join(PATH.src.all, '/index.html'))
  return gulp.src(join(PATH.src.all, '/index.html'))
    .pipe(inject(target, { transform: transformPath('dev') }))
    .pipe(template(templateLocals()))
    .pipe(gulp.dest(PATH.dest.dev.all));
});

gulp.task('build.app.dev', function(done) {
  runSequence('clean.app.dev', 'build.assets.dev', 'build.index.dev', done);
});

gulp.task('build.dev', function(done) {
  runSequence('clean.dev', 'build.lib.dev', 'build.app.dev', done);
});

// --------------
// Build prod.

gulp.task('build.lib.prod', function() {
  var jsOnly = filter('**/*.js');
  var lib = gulp.src(PATH.src.lib);

  return series(lib)
    .pipe(jsOnly)
    .pipe(concat('lib.js'))
    .pipe(uglify())
    .pipe(gulp.dest(PATH.dest.prod.lib));
});

gulp.task('build.js.tmp', function() {
  var result = gulp.src([join(PATH.src.all, '/**/*ts'), '!' + join(PATH.src.all, '/init.ts')])
    .pipe(plumber())
    .pipe(tsc(tsProject));

  return result.js
    .pipe(template({ VERSION: getVersion() }))
    .pipe(gulp.dest('tmp'));
});

// TODO: add inline source maps (System only generate separate source maps file).
gulp.task('build.js.prod', ['build.js.tmp'], function() {
  return appProdBuilder.build('app', join(PATH.dest.prod.all, 'app.js'),
      { minify: true }).catch(function(e) { console.log(e); });
});

gulp.task('build.init.prod', function() {
  var result = gulp.src(join(PATH.src.all, '/init.ts'))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject));

  return result.js
    .pipe(uglify())
    .pipe(template(templateLocals()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(PATH.dest.prod.all));
});

gulp.task('build.assets.prod', ['build.js.prod'], function() {
  var filterHTML = filter('**/*.html');
  var filterCSS = filter('**/*.css');
  return gulp.src([join(PATH.src.all, '/**/*.html'), join(PATH.src.all, '/**/*.css')])
    .pipe(filterHTML)
    .pipe(minifyHTML(HTMLMinifierOpts))
    .pipe(filterHTML.restore())
    .pipe(filterCSS)
    .pipe(minifyCSS())
    .pipe(filterCSS.restore())
    .pipe(gulp.dest(PATH.dest.prod.all));
});

gulp.task('build.index.prod', function() {
  var target = gulp.src([join(PATH.dest.prod.lib, 'lib.js'),
                         join(PATH.dest.prod.all, '**/*.css')], {read: false});
  return gulp.src(join(PATH.src.all, '/index.html'))
    .pipe(inject(target, { transform: transformPath('prod') }))
    .pipe(template(templateLocals()))
    .pipe(gulp.dest(PATH.dest.prod.all));
});

gulp.task('build.app.prod', function(done) {
// build.init.prod does not work as sub tasks dependencies so placed it here.
  runSequence('clean.app.prod', 'build.init.prod', 'build.assets.prod',
              'build.index.prod', 'clean.tmp', done);
});

gulp.task('build.prod', function(done) {
  runSequence('clean.prod', 'build.lib.prod', 'clean.tmp', 'build.app.prod',
              done);
});

// --------------
// Version.

registerBumpTasks();

gulp.task('bump.reset', function() {
  return gulp.src('package.json')
    .pipe(bump({version: '0.0.0'}))
    .pipe(gulp.dest('./'));
});

// --------------
// Test.

// To be implemented.

// --------------
// Serve dev.

gulp.task('serve.dev', ['build.dev', 'livereload'], function() {
  watch(join(PATH.src.all, '/**'), function(e) {
    runSequence('build.app.dev', function() {
      notifyLiveReload(e);
    });
  });
  serveSPA('dev');
});

// --------------
// Serve prod.

gulp.task('serve.prod', ['build.prod', 'livereload'], function() {
  watch(join(PATH.src.all, '/**'), function(e) {
    runSequence('build.app.prod', function() {
      notifyLiveReload(e);
    });
  });
  serveSPA('prod');
});

// --------------
// Livereload.

gulp.task('livereload', function() {
  tinylr.listen(LIVE_RELOAD_PORT);
});

// --------------
// Utils.

functionnotifyLiveReload(e) {
  var fileName = e.path;
  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

functiontransformPath(env) {
  var v = '?v=' + getVersion();
  return function(filepath) {
    var filename = filepath.replace('/' + PATH.dest[env].all, '') + v;
    arguments[0] = join(APP_BASE, filename);
    return inject.transform.apply(inject.transform, arguments);
  };
}

functioninjectableDevAssetsRef() {
  var src = PATH.src.lib.map(function(path) {
    return join(PATH.dest.dev.lib, path.split('/').pop());
  });
  src.push(join(PATH.dest.dev.all, '**/*.css'));
  return src;
}

functiongetVersion() {
  var pkg = JSON.parse(fs.readFileSync('package.json'));
  return pkg.version;
}

functiontemplateLocals() {
  return {
    VERSION: getVersion(),
    APP_BASE: APP_BASE
  };
}

functionregisterBumpTasks() {
  semverReleases.forEach(function(release) {
    var semverTaskName = 'semver.' + release;
    var bumpTaskName = 'bump.' + release;
    gulp.task(semverTaskName, function() {
      var version = semver.inc(getVersion(), release);
      return gulp.src('package.json')
        .pipe(bump({version: version}))
        .pipe(gulp.dest('./'));
    });
    gulp.task(bumpTaskName, function(done) {
      runSequence(semverTaskName, 'build.app.prod', done);
    });
  });
}

functionserveSPA(env) {
  var app;
  app = express().use(APP_BASE, connectLivereload({ port: LIVE_RELOAD_PORT }), serveStatic(join(__dirname, PATH.dest[env].all)));
  app.all(APP_BASE + '*', function(req, res, next) {
    res.sendFile(join(__dirname, PATH.dest[env].all, 'index.html'));
  });
  app.listen(PORT, function() {
    openResource('http://localhost:' + PORT + APP_BASE);
  });
}
