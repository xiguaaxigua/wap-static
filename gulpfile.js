'use strict';

var fs = require('fs'); //文件操作，打开文件使用fs.open方法

var path = require('path');
/*用于处理目录的对象，提高开发效率*/

var gulp = require('gulp');
var webpack = require('webpack');
var gutil = require('gulp-util');

var plugins = require('gulp-load-plugins')({ rename: {
        'gulp-ruby-sass': 'sass',
        'gulp-clean-css': 'cleancss',
        'gulp-imagemin': 'imin',
        'gulp.spritesmith': 'sprite'
    } });

// Temporary solution until gulp 4
// https://github.com/gulpjs/gulp/issues/355
var runSequence = require('run-sequence');
/*按指定的顺序运行gulp任务*/

var pkg = require('./package.json');
var dirs = pkg['h5bp-configs'].directories;
/*加载H5网站目录配置*/

// ---------------------------------------------------------------------
// | Helper tasks                                                      |
// ---------------------------------------------------------------------

gulp.task('archive:create_archive_dir', function () {
    fs.mkdirSync(path.resolve(dirs.archive), '0755');
    /*创建目录*/
});

gulp.task('archive:zip', function (done) {
    /*存档，把此次文件打包存在某地*/
    var archiveName = path.resolve(dirs.archive, pkg.name + '_v' + pkg.version + '.zip');
    var archiver = require('archiver')('zip');
    var files = require('glob').sync('**/*.*', {
        'cwd': dirs.dist,
        'dot': true // include hidden files
    });
    var output = fs.createWriteStream(archiveName);

    archiver.on('error', function (error) {
        done();
        throw error;
    });

    output.on('close', done);

    files.forEach(function (file) {

        var filePath = path.resolve(dirs.dist, file);
        archiver.append(fs.createReadStream(filePath), {
            'name': file,
            'mode': fs.statSync(filePath).mode
        });
    });

    archiver.pipe(output);
    archiver.finalize();
});

gulp.task('clean', function (done) {
    require('del')([dirs.archive, dirs.dist]).then(function () {
        done();
    });
});

gulp.task('copy', ['copy:img']);
/**! 复制html **/
gulp.task('copy:html', function () {
    return gulp.src(dirs.src + '/*.html').pipe(gulp.dest(dirs.dist));
});
/**! 复制img **/
gulp.task('copy:img', function () {
    return gulp.src(dirs.src + '/img/*').pipe(plugins.imin()).pipe(gulp.dest(dirs.dist + '/img/'));
});

/******! css编译后压缩 *******/
gulp.task('css', function (done) {
    runSequence('css:sass', 'css:min', done);
});
gulp.task('css:sass', function () {
    return plugins.sass(dirs.src + '/css/main.scss').on('error', function (err) {
        console.log('Err!', err.message);
    }).pipe(gulp.dest(dirs.src + '/css'));
});
gulp.task('css:min', function () {
    return gulp.src(dirs.src + '/css/main.css').pipe(plugins.cleancss({ debug: true }, function (details) {
        console.log(details.name + ': ' + details.stats.minifiedSize);
    })).pipe(plugins.rename({ suffix: '.min' })).pipe(plugins.replace()).pipe(gulp.dest(dirs.dist + '/css'));
});

/*******! 替换html中的css/js ********/
gulp.task('replace', function (done) {
    runSequence('re:css', 're:js', done);
});
gulp.task('re:css', function () {
    var version = Math.floor(Date.parse(new Date()) / 1000);
    return gulp.src(dirs.src + '/*.html').pipe(plugins.replace('css/main.css', 'css/main.min.css?v=' + version).on('end', function () {
        console.log('css replace css ok');
    })).pipe(gulp.dest(dirs.dist + '/'));
});
gulp.task('re:js', function () {
    var version = Math.floor(Date.parse(new Date()) / 1000);
    return gulp.src(dirs.dist + '/*.html').pipe(plugins.replace('../dist/js/main.js', 'js/main.js?v=' + version).on('end', function () {
        console.log('css replace js ok');
    })).pipe(gulp.dest(dirs.dist + '/'));
});

/*******! JS验证-解析ES6-合并压缩 ,'webpack','js:uglify' ********/
gulp.task('js', function (done) {
    //'webpack',
    runSequence('js:eslint', 'webpack', 'js:min', done);
});
gulp.task('js:eslint', function () {
    //实用性并不大
    return gulp.src(dirs.src + '/js/**/*.js').pipe(plugins.eslint({
        useEslintrc: false,
        rules: {
            'comma-dangle': ['error', 'never'],
            'no-console': ['error'],
            'no-dupe-args': ['error'],
            'no-dupe-keys': ['error'],
            'no-empty': ['error'],
            'no-func-assign': ['error'],
            'no-invalid-regexp': ['error'],
            'valid-jsdoc': ['error'],
            'no-alert': ['error'],
            'no-redeclare': ['error'],
            'no-script-url': ['error'],
            'no-unused-vars': ['error'],
            'camelcase': ['error', { 'properties': 'always' }]
        },
        env: ['browser', 'es6'],
        globals: ['Zepto', '$']
    })).pipe(plugins.eslint.format());
});

gulp.task('webpack', function (callback) {
    webpack({
        devtool: 'source-mao', //生成sourcemap.便于开发调试
        entry: ['./src/js/main', './src/js/verification.class', './src/js/nationality'], //获取项目入口JS文件, 支持数组形式， ["./entry1", "./entry2"]
        output: {
            path: path.join(__dirname, 'dist/js'), //文件输出目录
            publicPath: 'dist/js/', //用于配置文件发布路径，如CDN或本地服务器
            filename: '[name].js' //根据入口文件输出的对应多个文件名
        },
        module: {
            loaders: [{ test: /\.js$/, loader: 'babel' }]
        },
        resolve: {
            extensions: ['', '.js', '.jsx', '.json']
        }
    }, function (err, stats) {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task('js:min', function () {
    "use strict";
    return gulp.src(dirs.dist + '/js/**/*.js').pipe(plugins.uglify()).pipe(gulp.dest(dirs.dist + '/js/'));
});

/*******! 图片合并压缩/复制 ********/
gulp.task('sprite', function () {
    "use strict";
    return gulp.src(dirs.src + '/img/icons/*.png').pipe(plugins.sprite({
        imgName: 'icons.png',
        cssName: '../../dist/css/common/icons.css',
        cssFormat: 'css',
        padding: 10
    })).pipe(gulp.dest(dirs.dist + '/img/'));
});

// ---------------------------------------------------------------------
// | Main tasks                                                        |
// ---------------------------------------------------------------------
/*存档*/
gulp.task('archive', function (done) {
    runSequence('build', 'archive:create_archive_dir', 'archive:zip', done);
});

/*打包*/
gulp.task('build', function (done) {
    runSequence('clean', 'copy', done);
});

/*新建test任务，用于测试*/
gulp.task('test', function (done) {
    "use strict";
    runSequence('clean', 'css', 'js', 'copy', 'replace', done);
});

/*默认任务，执行build*/
gulp.task('default', ['test']);
