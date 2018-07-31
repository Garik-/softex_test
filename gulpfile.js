var gulp = require('gulp'), //http://gulpjs.com/
  util = require('gulp-util'), //https://github.com/gulpjs/gulp-util
  sass = require('gulp-sass'), //https://www.npmjs.org/package/gulp-sass
  autoprefixer = require('gulp-autoprefixer'), //https://www.npmjs.org/package/gulp-autoprefixer
  minifycss = require('gulp-minify-css'), //https://www.npmjs.org/package/gulp-minify-css
  rename = require('gulp-rename'), //https://www.npmjs.org/package/gulp-rename
  rigger = require('gulp-rigger'),
  watch = require('gulp-watch'),
  uglify = require('gulp-uglify'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  webpack = require('webpack'),
  path = require('path'),
  webpackStream = require('webpack-stream');

gulp.task('sass', function () {


  gulp.src('src/styles/style.scss')
    .pipe(sass({
      style: 'expanded'
    }))
    .pipe(autoprefixer('last 3 version', 'safari 5', 'ie 8', 'ie 9', 'ios 6', 'android 4'))
    .pipe(gulp.dest('public/css'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minifycss())
    .pipe(gulp.dest('public/css'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('html', function () {
  gulp.src('src/html/*.html')
    .pipe(rigger())
    .pipe(gulp.dest('public'))
    .pipe(reload({
      stream: true
    }));

    gulp.src('src/pic/*.*').pipe(gulp.dest('public/img'));
});

gulp.task('js', function () {
  
  gulp.src('./src/js/app.js')
    .pipe(webpackStream({
      'context': __dirname,
      'entry': {
          'app': path.resolve(__dirname, './src/js/app.js'),
      },
      'output': {
          path: path.resolve(__dirname, './public/js'),
          filename: '[name].js',
          library: '[name]',
          libraryTarget: 'umd'
      },
      'resolve': {
        'alias': {
          'vue$': 'vue/dist/vue.common.js' // 'vue/dist/vue.common.js' for webpack 1
        }
      },
      'module': {
          rules: [
              {
                  'use': ['babel-loader','eslint-loader'],
                  'test': /\.js$/,
                  'exclude': /node_modules/
              }
          ]
      },
      'plugins': [
          new webpack.optimize.OccurrenceOrderPlugin,
          new webpack.optimize.UglifyJsPlugin
      ]
  })).pipe(gulp.dest('public/js'));
    
});

gulp.task('webserver', function () {
  browserSync({
    server: {
      baseDir: 'public'
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: 'garik.djan'
  });
});

gulp.task('watch', function () {

  watch(['src/html/**/*.html'], function (event, cb) {
    gulp.start('html');
  });

  watch(['src/styles/**/*.scss'], function (event, cb) {
    gulp.start('sass');
  });

  watch(['src/js/**/*.js'], function (event, cb) {
    gulp.start('js');
  });
});

gulp.task('build', ['html', 'sass', 'js']);
gulp.task('default', ['build', 'webserver', 'watch']);
