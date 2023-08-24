var paths           = require('./gulppaths');
var vendorincludes  = require('./vendorincludes');
var gulp            = require('gulp');
var run             = require('gulp-run');
var clean           = require('gulp-clean');
var concat          = require('gulp-concat');
var sass            = require('gulp-sass')(require('sass'));
var postcss         = require('gulp-postcss');
var autoprefixer    = require('autoprefixer');
var cssnano         = require ('cssnano');
var imagemin        = require('gulp-imagemin');
var uglify          = require('gulp-uglify');
var purgecss        = require('gulp-purgecss');
var sharpResponsive = require('gulp-sharp-responsive')
var mode            = require('gulp-mode')({
                        modes: ["production", "development"],
                        default: "development"
                    });
var browserSync     = require('browser-sync').create();


// styles
function buildStyles() {
    var plugins = [autoprefixer(),
        cssnano()]
    return gulp.src(vendorincludes.scssCopy.concat([paths.sassFilesGlob]))
        .pipe(sass({includePaths: [paths.sassPartialsFolderName].concat(vendorincludes.scssInclude)})
            .on('error', sass.logError))
        .pipe(mode.production(postcss(plugins)))
        .pipe(mode.production(purgecss({content: [paths.siteHtmlFilesGlob]})))
        .pipe(gulp.dest(paths.jekyllCssFiles))
        .pipe(gulp.dest(paths.siteCssFiles));
}

function cleanStyles() {
    return gulp.src([`${paths.jekyllCssFilesGlob}`,
        `${paths.siteCssFilesGlob}`],{allowEmpty: true})
        .pipe(clean({force: true}));
}

// javascript
function buildJs() {
    return gulp.src(vendorincludes.jsMerge.concat([paths.jsFilesGlob]))
        .pipe(concat('main.js'))
        .pipe(gulp.src([`${vendorincludes.jsCopy}`],{allowEmpty: true}))
        .pipe(mode.production(uglify()))
        .pipe(gulp.dest(paths.jekyllJsFiles))
        .pipe(gulp.dest(paths.siteJsFiles)); 
}

function cleanJs() {
    return gulp.src([`${paths.jekyllJsFilesGlob}`,
    `${paths.siteJsFilesGlob}`],{allowEmpty: true})
    .pipe(clean({force: true}));
}

// images
function buildImages() {
    return gulp.src(paths.imageFilesGlob)
        .pipe(imagemin())
        .pipe(sharpResponsive({formats: [
            { width: 50, rename: { suffix: "-50w" }, format: "webp"},
            { width: 100, rename: { suffix: "-100w" }, format: "webp"},
            { width: 150, rename: { suffix: "-150w" }, format: "webp"},
            { width: 200, rename: { suffix: "-200w" }, format: "webp"},
            { width: 250, rename: { suffix: "-250w" }, format: "webp"},
            { width: 300, rename: { suffix: "-300w" }, format: "webp"},
            { width: 400, rename: { suffix: "-400w" }, format: "webp"},
            { width: 500, rename: { suffix: "-500w" }, format: "webp"},
            { width: 600, rename: { suffix: "-600w" }, format: "webp"},
            { width: 700, rename: { suffix: "-700w" }, format: "webp"},
            { width: 800, rename: { suffix: "-800w" }, format: "webp"},
            { width: 900, rename: { suffix: "-900w" }, format: "webp"},
            { width: 1000, rename: { suffix: "-1000w" }, format: "webp"},
            { width: 1250, rename: { suffix: "-1250w" }, format: "webp"},
            { width: 1500, rename: { suffix: "-1500w" }, format: "webp"},
            { width: 1750, rename: { suffix: "-1750w" }, format: "webp"},
            { width: 2000, rename: { suffix: "-2000w" }, format: "webp"},
            { width: 50, rename: { suffix: "-50w" }},
            { width: 100, rename: { suffix: "-100w" }},
            { width: 150, rename: { suffix: "-150w" }},
            { width: 200, rename: { suffix: "-200w" }},
            { width: 250, rename: { suffix: "-250w" }},
            { width: 300, rename: { suffix: "-300w" }},
            { width: 400, rename: { suffix: "-400w" }},
            { width: 500, rename: { suffix: "-500w" }},
            { width: 600, rename: { suffix: "-600w" }},
            { width: 700, rename: { suffix: "-700w" }},
            { width: 800, rename: { suffix: "-800w" }},
            { width: 900, rename: { suffix: "-900w" }},
            { width: 1000, rename: { suffix: "-1000w" }},
            { width: 1250, rename: { suffix: "-1250w" }},
            { width: 1500, rename: { suffix: "-1500w" }},
            { width: 1750, rename: { suffix: "-1750w" }},
            { width: 2000, rename: { suffix: "-2000w" }}
        ], includeOriginalFile: true}))
        .pipe(gulp.dest(paths.jekyllImageFiles))
        .pipe(gulp.dest(paths.siteImageFiles));
}

function cleanImages() {
    return gulp.src([paths.jekyllImageFilesGlob,
        paths.siteImageFilesGlob], {allowEmpty: true})
    .pipe(clean({force: true}));
}

// fonts
function buildFonts() {
    return gulp.src([paths.fontFilesGlob].concat(vendorincludes.fontCopy),{allowEmpty: true})
        .pipe(gulp.dest(paths.jekyllFontFiles))
        .pipe(gulp.dest(paths.siteFontFiles));
}

function cleanFonts() {
    return gulp.src([paths.jekyllFontFilesGlob,
        paths.siteFontFilesGlob], {allowEmpty: true})
    .pipe(clean({force: true}));
}

function runShellCmd(cmd) {
    var shellCommand = new run.Command(cmd);
    shellCommand.exec();
}

function buildJekyll(cb) {
    runShellCmd('bundle exec jekyll build');
    cb();
}


function cleanJekyll(cb) {
    runShellCmd('bundle exec jekyll clean')
    cb();
}

exports.buildStyles = buildStyles;
exports.cleanStyles = cleanStyles;

exports.buildJs = buildJs;
exports.cleanJs = cleanJs;

exports.buildImages = buildImages;
exports.cleanImages = cleanImages;

exports.buildFonts = buildFonts;
exports.cleanFonts = cleanFonts;

exports.buildJekyll = buildJekyll;
exports.cleanJekyll = cleanJekyll;


exports.clean = gulp.series(cleanStyles, cleanJs, cleanImages, cleanFonts, cleanJekyll);
exports.build = gulp.series(exports.clean, buildJekyll, buildStyles, buildJs, buildImages, buildFonts);

exports.serve = function () {

    // run initial build
    exports.build();

    browserSync.init({
        server: paths.siteDir,
        open: true
    });

    var watchOptions = {usePolling: true};

    // Watch site settings.
    gulp.watch('_config.yml', watchOptions, gulp.series(buildJekyll));

    // Watch .scss files
    gulp.watch(paths.sassFilesGlob, watchOptions, gulp.series(buildStyles));

    // Watch .js files
    gulp.watch(paths.jsFilesGlob, watchOptions, gulp.series(buildJs));

    // Watch image files
    gulp.watch(paths.imageFilesGlob, watchOptions, gulp.series(buildImages));

    // Watch fonts
    gulp.watch(paths.fontFilesGlob, watchOptions, gulp.series(buildFonts));

    // Watch posts
    gulp.watch(paths.jekyllPostFilesGlob, watchOptions, gulp.series(buildJekyll));

    // Watch html and markdown files
    gulp.watch(['**/*.+(html|md|markdown|MD)', '!_site/**/*.*'], watchOptions, gulp.series(buildJekyll));

    // Watch data files
    gulp.watch(paths.jekyllDataFilesGlob, watchOptions, gulp.series(buildJekyll));

    // Watch favicon.png
    gulp.watch('favicon.png', watchOptions, gulp.series(buildJekyll));

}

exports.default = exports.build;
