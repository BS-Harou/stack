var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');

gulp.task('default', ['webpack']);

gulp.task('clean', function() {
	return del('dist/*');
});

gulp.task('bootstrap', function() {
	gulp
	.src('./node_modules/bootstrap/dist/css/bootstrap{.min,}.css{.map,}')
	.pipe(gulp.dest('dist'))
});

gulp.task('webpack', ['bootstrap'], function(done) {
	webpack(webpackConfig, function(err, stats) {
		if (err) throw new gutil.PluginError("webpack", err);
		gutil.log("[webpack]", stats.toString({
			colors: true
		}));
		done();
	});
});

gulp.task('watch', ['bootstrap'], function(done) {
	// Start a webpack-dev-server
	var compiler = webpack(webpackConfig);

	new WebpackDevServer(compiler, webpackConfig.devServer)
	.listen(8080, "localhost", function(err) {
		if (err) throw new gutil.PluginError("webpack-dev-server", err);
		gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
		done();
	});
});
