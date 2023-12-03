const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('default', () =>
	gulp.src(['webapp/publicDev/*.js','webapp/publicDev/components/*.js'])
    .pipe(concat('main.js'))
		.pipe(babel({
			presets: ["@babel/preset-env","@babel/preset-react"]
		}))
    .pipe(uglify())
		.pipe(gulp.dest('webapp/public/'))
);
