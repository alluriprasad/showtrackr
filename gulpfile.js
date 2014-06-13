var gulp = require('gulp');
var sass = require('gulp-sass');
var uncss = require('gulp-uncss');
var plumber = require('gulp-plumber');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templatecache');


gulp.task('sass', function() {
  gulp.src('public/stylesheets/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(uncss({
		html: [
			'public/index.html',
			'public/views/add.html',
			'public/views/detail.html',
			'public/views/login.html',
			'public/views/signup.html',
			'public/views/home.html'
		]    	
    }))
    .pipe(csso())
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('compress', function() {
  gulp.src([
    'public/bower_components/angular/angular.js',
    'public/bower_components/angular-strap.js',
    'public/bower_components/angular-strap.tpl.js',
    'public/bower_components/angular-messages.js',
    'public/bower_components/angular-resource.js',
    'public/bower_components/angular-route.js',
    'public/bower_components/angular-cookies.js',
    'public/bower_components/moment.min.js',
    'public/app.js',
    'public/services/*.js',
    'public/controllers/*.js',
    'public/filters/*.js',
    'public/directives/*.js'
  ])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
  gulp.watch('public/stylesheets/*.scss', ['sass']);
});

gulp.task('templates', function() {
  gulp.src('public/views/**/*.html')
    .pipe(templateCache({ root: 'views', module: 'MyApp' }))
    .pipe(gulp.dest('public'));
});

gulp.task('default', ['sass', 'compress', 'templates', 'watch']);