import gulp from "gulp";
import cp from "child_process";
import gutil from "gulp-util";
import postcss from "gulp-postcss";
import cssImport from "postcss-import";
import cssnext from "postcss-cssnext";
import BrowserSync from "browser-sync";
import webpack from "webpack";
import webpackConfig from "./webpack.conf";
import webpackConfigProduction from "./webpack.conf.production";
import gulpMinifyCSS from 'gulp-minify-css';
import gulpNop from 'gulp-nop';

const browserSync = BrowserSync.create();
const hugoBin = "hugo";
const defaultArgs = ["-d", "dist", "-v", "--buildDrafts"];

gulp.task("hugo", (cb) => buildSite(cb));
gulp.task("hugo-preview", (cb) => buildSite(cb, ["--buildDrafts", "--buildFuture"]));

gulp.task("build", ["css", "js", "hugo"]);
gulp.task("build-preview", ["css", "js", "hugo-preview"]);

gulp.task("css", () => (
  gulp.src("./css/*.css")
    .pipe(postcss(
      [
        cssImport({ from: "./css/main.css" }),
        cssnext()
      ]
    ))
    .pipe(process.env.PROD_ENV ? gulpMinifyCSS() : gulpNop())
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream())
));

gulp.task("js", (cb) => {
  const myConfig = Object.assign({}, webpackConfig);

  webpack(myConfig, (err, stats) => {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      colors: true,
      progress: true
    }));
    browserSync.reload();
    cb();
  });
});

gulp.task("server", ["hugo", "css", "js"], () => {
  browserSync.init({
    ui: {
      port: 1399,
      weinre: {
        port: 9090
      }
    },
    server: {
      baseDir: "./dist"
    },
    port: 1313
  });
  gulp.watch("./js/**/*.js", ["js"]);
  gulp.watch("./css/**/*.css", ["css"]);
  gulp.watch([
    "./archteypes/**/*",
    "./content/**/*",
    "./data/**/*",
    "./layouts/**/*",
    "./static/**/*",
    "./themes/**/*",
    "config.yml"
  ], ["hugo"]);
});

function buildSite(cb, options) {
  const args = options ? defaultArgs.concat(options) : defaultArgs;

  return cp.spawn(hugoBin, args, { stdio: "inherit" }).on("close", (code) => {
    if (code === 0) {
      browserSync.reload();
      cb();
    } else {
      browserSync.notify("Hugo build failed :(");
      cb("Hugo build failed");
    }
  });
}
