// var gulp = require('gulp');
// var browserSync = require('browser-sync').create();

// // Static server
// gulp.task('browser-sync', function () {
//     browserSync.init({
//         server: {
//             baseDir: "./src/index.html"
//         }
//     });
// });




var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
const minify = require('gulp-minify');

gulp.task('dev', function () {
    browserSync.init({
        server: {
            baseDir: "./src"
        },
        files: ['index.html', 'app/*.js']
    });
    gulp.watch("style/*.scss", gulp.series('sass'));
    gulp.watch('app/*.js', gulp.series('compress'));
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch('*.html')
        .on('change', gulp.series('html'));
});

gulp.task('sass', function () {
    return gulp.src("./src/style/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("../public/style"))
        .pipe(browserSync.stream());
});

gulp.task('compress', async function () {
    gulp.src(['app/*.js'])
        .pipe(minify())
        .pipe(gulp.dest('./public'));
});

gulp.task('html', async function(){
    gulp.src(['src/*.html'])
        .pipe(gulp.dest('public'))
        .pipe(browserSync.stream());
});

gulp.task('distribute', function () {

});
