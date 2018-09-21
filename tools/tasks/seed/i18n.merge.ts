import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as runSequence from 'run-sequence';
import * as through2 from 'through2';
import { argv } from 'yargs';
import { join } from 'path';

import Config from '../../config';

const plugins = <any>gulpLoadPlugins();
const sourceElements: any[] = [];
const args = argv;
let langEmpty = true;

gulp.task('get_source_i18n', function () {
  return gulp.src(join(Config.TMP_DIR, 'messages.xlf'))
    .pipe(plugins.cheerio({
      run: function ($: any, file: any) {
        $('trans-unit').each(function () {
          sourceElements.push($(this));
        });
      },
      parserOptions: {
        xmlMode: true,
        decodeEntities: false
      }
    }));
});

gulp.task('merge_translations_i18n', function () {
  return gulp.src(join(Config.LOCALE_DEST, '*.xlf'))
    .pipe(plugins.cheerio({
      run: function ($: any, file: any) {
        const sourceIds: string[] = [];
        langEmpty = false;
        for (const sourceElement of sourceElements) {
          const id = $(sourceElement).attr('id');
          sourceIds.push(id);
          const targetElement = $('#' + id);
          if (targetElement.length === 0) {
            // missing translation
            $('body').append(sourceElement);
          } else {
            // update context group location
            const newContextEl = $(sourceElement).children('context-group')
              .attr('purpose', 'location');
            targetElement.children('context-group').attr('purpose', 'location')
              .replaceWith(newContextEl);
          }
        }
        $('trans-unit').map((function () {
          const id = $(this).attr('id');
          const existing = sourceIds.find((item) => item === id);
          if (!existing) {
            $('#' + id).remove();
          }
        }));
      },
      parserOptions: {
        xmlMode: true,
        decodeEntities: false
      }
    }))
    .pipe(gulp.dest(Config.LOCALE_DEST));
});

gulp.task('copy_source_i18n', function () {
  const locDef = args.lang ? args.lang : 'en';
  return gulp.src(join(Config.TMP_DIR, 'messages.xlf'))
    .pipe(plugins.rename(`messages.${locDef}.xlf`))
    .pipe(langEmpty ? gulp.dest(Config.LOCALE_DEST) : through2.obj());
});

export = () =>
  runSequence('get_source_i18n', 'merge_translations_i18n', 'copy_source_i18n', 'clean.prod');
