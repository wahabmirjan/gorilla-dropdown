// Include required node/gulp tools

var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var babel = require('gulp-babel');
var cleanCSS = require('gulp-clean-css');
var cssbeautify = require('gulp-cssbeautify');
var del = require('del');
var jshint = require('gulp-jshint');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');





// Source files
var SRC_CSS = 'src/css/*.scss';
var SRC_JS = 'src/js/*.js';

// Destination directories
var DEST_CSS = 'dist/css';
var DEST_JS = 'dist/js';





// CLEAN files
gulp.task('clean:css', function () {
	return del([DEST_CSS]);
});

gulp.task('clean:js', function () {
	return del([DEST_JS]);
});





// Lint JS
gulp.task('lint:js', function() {
	return gulp.src(SRC_JS)
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(jshint.reporter('fail'));
});





// Build CSS
gulp.task('build:css', ['clean:css'], function () {
	return gulp.src(SRC_CSS)
			.pipe(sass().on('error', sass.logError))
			.pipe(postcss( [autoprefixer({browsers: ['last 10 versions']})] ))
			.pipe(cssbeautify({ autosemicolon: true }))
			.pipe(gulp.dest(DEST_CSS))
			.pipe(cleanCSS({compatibility: 'ie8'}))
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest(DEST_CSS));
});

// Build JS
gulp.task('build:js', ['clean:js', 'lint:js'], function() {
	return gulp.src(SRC_JS)
			.pipe(babel({presets: ['env']}))
			.pipe(gulp.dest(DEST_JS))
			.pipe(uglify({output: {comments:'some'}}))
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest(DEST_JS));
});





// WATCH for file changes and run the tasks
gulp.task('watch', function() {
    gulp.watch(SRC_JS, ['build:js']);
    gulp.watch(SRC_CSS, ['build:css']);
});
