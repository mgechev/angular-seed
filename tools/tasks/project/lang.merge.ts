import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as runSequence from 'run-sequence';
import { join } from 'path';
import Config from '../../config';

const plugins = <any>gulpLoadPlugins();
const sourceElements: any[] = [];
let langEmpty: boolean = true;

gulp.task('get-source', function() {
    return gulp.src(join(Config.TMP_DIR, 'messages.xlf'))
        .pipe(plugins.cheerio({
            run: function($: any, file: any) {
                $('trans-unit').each(function() {
                    sourceElements.push($(this));
                });
            },
            parserOptions: {
                xmlMode: true
            }
        }));
});

gulp.task('merge-to-translations', function() {
    let langDest = join(Config.ASSETS_SRC, 'locale');
    return gulp.src(join(langDest, '*.xlf'))
        .pipe(plugins.cheerio({
            run: function($: any, file: any) {
                let sourceIds:string[] = [];
                langEmpty = false;
                 for (var sourceElement of sourceElements) {
                    let id = $(sourceElement).attr('id');
                     sourceIds.push(id);
                    let targetElement = $('#' + id);
                     if (targetElement.length === 0) {
                         // missing translation
                         $('body').append(sourceElement);
                     }
                 }
                 $('trans-unit').map((function() {
                    let id = $(this).attr('id');
                    let existing = sourceIds.find((item) => { return item === id; });
                     if (!existing) {
                         $('#' + id).remove();
                     }
                 }));
            },
            parserOptions: {
                xmlMode: true
            }
        }))
        .pipe(gulp.dest(langDest));
});

gulp.task('copy-source', function() {
  let langDest = join(Config.ASSETS_SRC, 'locale');
    return gulp.src(join(Config.TMP_DIR, 'messages.xlf'))
    .pipe(langEmpty ? gulp.dest(langDest) : plugins.util.noop());
});

export = () =>
    runSequence('get-source','merge-to-translations','copy-source','clean.tmp');
