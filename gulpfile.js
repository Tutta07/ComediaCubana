const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks-render');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

function serve() {
    browserSync.init({
        server: {
            baseDir: "src/build"
        }
    });

    gulp.watch(['src/pages/**/*.njk', 'src/templates/**/*.njk'], {ignoreInitial: false}, htmlTemplate);
    gulp.watch(['src/sass/**/*.scss'], {ignoreInitial: false}, cssTranspile);
    gulp.watch(['src/*.js'], {ignoreInitial: false}, copyJS);
    gulp.watch(['src/assets/**/*'],{ignoreInitial:false},copyAssets);
   
}

function htmlTemplate() {
    return gulp.src('src/pages/**/*.njk')
        .pipe(nunjucks({
            path: ['src/templates']
        }))
        .pipe(gulp.dest('src/build'))
        .pipe(browserSync.stream());
}
function copyAssets(){
    return gulp.src('src/assets')
    .pipe(gulp.dest('src/build/assets'));
}
function cssTranspile() {
        return gulp.src('src/sass/*.scss')
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(gulp.dest('src/build/css'))
            .pipe(browserSync.stream());
}

function copyJS() {
    return gulp.src('src/*.js')
    .pipe(gulp.dest('src/build'));
}


exports.default = gulp.series(serve); 
