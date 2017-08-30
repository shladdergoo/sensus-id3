'use strict';
var gulp = require('gulp');
var tslint = require('gulp-tslint');
var exec = require('child_process').exec;
var excludeGitignore = require('gulp-exclude-gitignore');
var minimist = require('minimist');
var mocha = require('gulp-mocha');
var gulp = require('gulp-help')(gulp);
var bump = require('gulp-bump');
var plumber = require('gulp-plumber');
var path = require('path');
var del = require('del');
var istanbul = require('gulp-istanbul');
var tslintCustom = require('tslint'); // for tslint-next https://github.com/panuhorsmalahti/gulp-tslint#specifying-the-tslint-module
require('dotbin');

var tsFilesGlob = (function (c) {
    return c.filesGlob || c.files || 'src/**/*.ts';
})(require('./tsconfig.json'));

gulp.task('clean', 'Cleans the generated js files from lib directory', function () {
    return del([
        'dist/**/*'
    ]);
});

gulp.task('lint', 'Lints all TypeScript source files', ['clean'], function () {
    return gulp.src(tsFilesGlob)
        .pipe(tslint({
            tslint: tslintCustom,
            formatter: 'verbose'
        }))
        .pipe(tslint.report());
});

gulp.task('npm_install', function () {
    exec('npm install');
});

gulp.task('compile', 'Compiles all TypeScript source files', ['lint'], function (cb) {
    exec('tsc --version', function (err, stdout, stderr) {
        console.log('Using TypeScript', stdout);
        if (stderr) {
            console.log(stderr);
        }
    });

    return exec('tsc', function (err, stdout, stderr) {
        console.log(stdout);
        if (stderr) {
            console.log(stderr);
        }
        cb(err);

        gulp.src('./src/data.json')
            .pipe(gulp.dest('./dist/src'));
    });
});

gulp.task('build', ['compile'], function () {
});

gulp.task('build_full', ['npm_install', 'compile'], function () {
});

gulp.task('pre-test', ['build'], function () {
    return gulp.src(['dist/src/service/*.js', 'dist/src/controller/*.js'])
        .pipe(excludeGitignore())
        .pipe(istanbul({
            includeUntested: true
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function (cb) {
    var mochaErr;

    del(['./test/test-result.xml']);

    gulp.src('dist/test/**/*.js')
        .pipe(plumber())
        .pipe(mocha({
            reporter: 'mocha-junit-reporter',
            reporterOptions: {
                mochaFile: './test/test-result.xml'
            }
        }))
        .on('error', function (err) {
            mochaErr = err;
        })
        .pipe(istanbul.writeReports(
            {
                reporters: ['lcov', 'json', 'text', 'text-summary', 'cobertura']
            }
        ))
        .on('end', function () {
            cb(mochaErr);
        });
});

gulp.task('test-ts', 'Runs the Jasmine test specs', ['build'], function () {
    return gulp.src('test/*.ts')
        .pipe(mocha({
            require: ['ts-node/register']
        }));
});

gulp.task('npm-version', 'Apply a version number to package.json', function () {

    var knownOptions = {
        string: 'v'
    };

    var options = minimist(process.argv.slice(2), knownOptions);

    gulp.src('./package.json')
        .pipe(bump({ version: options.v }))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', 'Watches ts source files and runs tests on change', function () {
    gulp.watch(tsFilesGlob, ['test']);
});

