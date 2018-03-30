'use strict';

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({
        pattern: '*'
    });

var mobile = '-mobile'
var mobile = ''

var page = `index${mobile}`

var sass = require('gulp-ruby-sass');
var rename = require('gulp-rename');
var sourceMaps = require('gulp-sourcemaps');
var autoPrefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var fileinclude = require('gulp-file-include');
var jsImport = require('gulp-js-import');
var include = require('gulp-include');

var source = 'source',
    build = 'build',
    config = {
        port: 9000,
        tunnel: false,
        notify: false,
        host: 'localhost',
        server: { baseDir: build }
    },
    path = {
        build: {
            html: build + `/pages${mobile}`,
            fonts: build + '/fonts',
            videos: build + '/videos',
            images: build + '/images',
            styles: build + `/styles${mobile}`,
            stylesCommon: build + `/styles${mobile}`,
            scripts: build + `/scripts${mobile}`,
            projects: build + '/projects'
        },
        source: {
            html: source + `/pages${mobile}/**/**/**/**/**/**/*.html`,
            fonts: source + '/fonts/**/*.*',
            videos: source + '/videos/**/**/**/*.*',
            images: source + '/images/**/**/**/**/**/*.*',
            styles: source + `/styles${mobile}/**/**/**/**/**/*.*`,
            stylesCommon: source + `/styles${mobile}/**/**/**/**/**/*.*`,
            scripts: source + `/scripts${mobile}/**/**/**/**/*.*`,
            projects: source + '/projects/**/*'
        },
        watch: {
            html: source + `/pages${mobile}/**/**/**/**/**/**/*.html`,
            fonts: source + '/fonts/**/*.*',
            videos: source + '/videos/**/**/**/*.*',
            images: source + '/images/**/**/**/**/**/*.*',
            styles: source + `/styles${mobile}/**/**/**/**/**/*.*`,
            stylesCommon: source + `/styles${mobile}/components/**/**/**/**/*.*`,
            scripts: source + `/scripts${mobile}/**/**/**/**/*.*`,
            projects: source + '/projects/**/*'
        },
        clean: 'build'
    };

gulp.task('default', ['build', 'server', 'watch']);

gulp.task('build', ['html', 'fonts', 'videos', 'images', 'sass', 'sass-common', 'scripts', 'projects']);

gulp.task('html', function() {
    gulp.src(path.source.html)
        .pipe(plugins.plumber())
        .pipe(fileinclude({
            prefix: '@@',
            basepath: `source/pages${mobile}/`
        }))
        .pipe(gulp.dest(path.build.html))
        .pipe(plugins.browserSync.reload({
            stream: true
        }));
});

gulp.task('fonts', function() {
    gulp.src(path.source.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task('videos', function() {
    gulp.src(path.source.videos)
        .pipe(gulp.dest(path.build.videos));
});

gulp.task('images', function() {
    gulp.src(path.source.images)
        .pipe(gulp.dest(path.build.images));
});

gulp.task('sass', function() {
    return sass(`source/styles${mobile}/${page}.scss`, { sourcemap: false/*, style: 'compact'*/ })
        .on('error', sass.logError)
        // .pipe(sourceMaps.init({loadMaps: true}))
        .pipe(autoPrefixer('last 2 version'))
        .pipe(rename(`${page}.css`))
        // .pipe(cleanCSS())
        // .pipe(sourceMaps.write())
        .pipe(gulp.dest(path.build.styles))
        .pipe(plugins.browserSync.reload({
            stream: true
        }));
});

gulp.task('sass-common', function() {
    return sass(`source/styles${mobile}/common.scss`, { sourcemap: false/*, style: 'compact'*/ })
        .on('error', sass.logError)
        // .pipe(sourceMaps.init({loadMaps: true}))
        .pipe(autoPrefixer('last 2 version'))
        .pipe(rename(`common.css`))
        // .pipe(cleanCSS())
        // .pipe(sourceMaps.write())
        .pipe(gulp.dest(path.build.stylesCommon))
        .pipe(plugins.browserSync.reload({
            stream: true
        }));
});

gulp.task('scripts', function() {
    gulp.src(path.source.scripts)
        .pipe(plugins.plumber())
        .pipe(include())
            .on('error', console.log)
        // .pipe(plugins.uglify())
        // .pipe(jsImport({hideConsole: true}))
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.build.scripts))
        .pipe(plugins.browserSync.reload({
            stream: true
        }));
});

gulp.task('projects', function() {
    gulp.src(path.source.projects)
        .pipe(gulp.dest(path.build.projects));
});

gulp.task('server', function() {
    plugins.browserSync(config);
});

gulp.task('clean', function(cb) {
    plugins.rimraf(path.clean, cb);
});

gulp.task('watch', function() {
    plugins.watch([path.watch.html], function(event, cb) {
        gulp.start('html');
    });
    plugins.watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts');
    });
    plugins.watch([path.watch.images], function(event, cb) {
        gulp.start('images');
    });
    plugins.watch([path.watch.videos], function(event, cb) {
        gulp.start('videos');
    });
    plugins.watch([path.watch.scripts], function(event, cb) {
        gulp.start('scripts');
    });
    plugins.watch([path.watch.styles], function(event, cb) {
        gulp.start('sass');
    });
    plugins.watch([path.watch.stylesCommon], function(event, cb) {
        gulp.start('sass-common');
    });
    plugins.watch([path.watch.projects], function(event, cb) {
        gulp.start('projects');
    });
});
