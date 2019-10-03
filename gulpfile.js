"use strict";

const gulp      = require("gulp");
const uglify    = require("gulp-uglify");
const babel     = require("gulp-babel");
const maps      = require("gulp-sourcemaps");
const rename    = require("gulp-rename");

const dirs = {
    src: "src/domlang.js",
    dest: "dest"
}

gulp.task("compile-js", function() {
    return gulp.src(dirs.src)
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(maps.init())
        .pipe(uglify())
        .pipe(maps.write(".maps"))
        .pipe(rename("domlang.min.js"))
        .pipe(gulp.dest(dirs.dest));
});

gulp.task("watch", gulp.series("compile-js", function() {
    gulp.watch(dirs.src, gulp.series("compile-js"));
}))

gulp.task("default", gulp.series("compile-js"));
