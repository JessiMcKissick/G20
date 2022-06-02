var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var browserSync = require('browser-sync').create();
const minify = require('gulp-minify');

gulp.task('dev', function () {
    browserSync.init({
        server: {
            baseDir: "./public"
        },
        files: ['index.html', 'app/*.js', '*.js', 'style/main.scss']
    });
    gulp.watch("src/style/*.scss", gulp.series('sass'));
    gulp.watch('src/app/*.js', gulp.series('compress'));
    gulp.watch('src/app/applets/*.js', gulp.series('compressApplet'))
    gulp.watch('src/solomon/*.js', gulp.series('compressLib'))
    gulp.watch('src/*.js', gulp.series('compressLocal'));
    gulp.watch('src/*.html', gulp.series('html'));
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('sass', async function () {
    return gulp.src("src/style/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("public/style/style.css"))
        .pipe(browserSync.stream());
});

gulp.task('compress', async function () {
    gulp.src(['src/app/*.js'], { allowEmpty: true })
        .pipe(minify({ noSource: true}))
        .pipe(gulp.dest('public/app'));
});
gulp.task('compressLocal', async function () {
    gulp.src(['src/*.js'], { allowEmpty: true, min: '' })
        .pipe(minify({ noSource: true }))
        .pipe(gulp.dest('public'));
});
gulp.task('compressLib', async function () {
    gulp.src(['src/solomon/*.js'], { allowEmpty: true, min: '' })
        .pipe(minify({ noSource: true }))
        .pipe(gulp.dest('public'));
});
gulp.task('compressApplet', async function(){
    gulp.src(['src/app/applets/*.js'], { allowEmpty: true, min: '' })
        .pipe(minify({ noSource: true }))
        .pipe(gulp.dest('public/app/applets'));
});



gulp.task('html', async function(){
    gulp.src(['src/*.html'],)
        .pipe(gulp.dest('public'))
        .pipe(browserSync.stream());
});

gulp.task('distribute', function () {
 
});
