var gulp = require('gulp');
var zip = require('gulp-zip');
var del = require('del');
var install = require('gulp-install');
var runSequence = require('run-sequence');
var awsLambda = require("node-aws-lambda");
var mocha = require('gulp-mocha');

gulp.task('clean', function() {
    return del(['./dist', './dist.zip']);
});

gulp.task('js', function() {
    return gulp.src(['app.js','lib/**'], { base: './'})
        .pipe(gulp.dest('dist/'));
});

gulp.task('node-mods', function() {
    return gulp.src('./package.json')
        .pipe(gulp.dest('dist/'))
        .pipe(install({production: true}));
});

gulp.task('test', function(callback) {
    console.log("  Running Tests:")
    return gulp.src('test/*test.js')
        .pipe(mocha({reporter: 'mochawesome'}))
        .once('error', (e) => {
            console.error("  Tests Errors: ");
            console.log("  "+e.message);
            process.exit(1);
        });
});

gulp.task('zip', function() {
    return gulp.src(['dist/**/*', '!dist/package.json'],{nodir: true})
        .pipe(zip('dist.zip'))
        .pipe(gulp.dest('./'));
});

gulp.task('upload', function(callback) {
    awsLambda.deploy('./dist.zip', require("./lambda-config.js"), callback);
});

gulp.task('deploy', function(callback) {
    return runSequence(
        ['test'],
        ['clean'],
        ['js', 'node-mods'],
        ['zip'],
        ['upload'],
        callback

    );
});