var gulp = require('gulp');

// 引入组件
var sass = require('gulp-ruby-sass'),    // sass
    autoprefixer = require('gulp-autoprefixer'), //autoprefixer
    minifycss = require('gulp-minify-css'), // CSS压缩
    uglify = require('gulp-uglify'),        // js压缩
    imagemin = require('gulp-imagemin'),    // 图片压缩
    concat = require('gulp-concat'),        // 合并文件
    rename = require('gulp-rename'),        // 重命名
    jshint = require('gulp-jshint'),        // js代码检查
    del = require('del');          // 清空文件夹

// sass解析
gulp.task('build-sass', function() {
  gulp.src('src/css/main.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('src/css'));
});

//语法检查
gulp.task('jshint', function() {
  gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


// 合并、压缩、重命名css
gulp.task('style',['build-sass'], function() {
    // 注意这里通过数组的方式写入两个地址,仔细看第一个地址是css目录下的全部css文件,第二个地址是css目录下的areaMap.css文件,但是它前面加了!,这个和.gitignore的写法类似,就是排除掉这个文件.
  gulp.src(['src/css/*.css','!dist/css/areaMap.css'])
    .pipe(concat('all.css'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'));
});

//语法检查, 合并，压缩js文件
gulp.task('script', function() {
  gulp.src('src/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

//压缩图片
gulp.task('images', function() {
  gulp.src('src/css/images/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/css/images'));

  gulp.src('src/images/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/images'));
});

// 清空图片、样式、js
gulp.task('clean', function (cb) {
  del([
    'dist/css/*',
  ], cb);
});


  //--------------------------css-------------------------------------


// 定义develop任务在日常开发中使用
gulp.task('develop',function(){
  gulp.run('build-sass','jshint');
  gulp.watch('src/css/*.scss', ['build-sass']);
  gulp.watch('src/js/*.js', ['jshint']);
});

// 定义一个prod任务作为发布或者运行时使用
gulp.task('product',function(){
  gulp.run('build-sass','style','script','images');
  // 监听.sass,一旦有变化,立刻调用build-less任务执行
  gulp.watch('src/css/*.scss', ['build-sass']);
});

// gulp命令默认启动的就是default认为,这里将clean任务作为依赖,也就是先执行一次clean任务,流程再继续.
gulp.task('default',['clean'],function() {
  gulp.run('develop');
});