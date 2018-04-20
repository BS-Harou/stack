const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const webpackConfig = require('./config/webpack.config.js');
const spawnSync = require('child_process').spawnSync;


gulp.task('default', ['run']);

gulp.task('build', function(done) {
	webpack(webpackConfig, function(err, stats) {
		if (err) throw new gutil.PluginError('webpack', err);
		gutil.log('[webpack]', stats.toString({
			colors: true
		}));
		done();
	});
});

gulp.task('run', function(done) {
	const child = spawnSync('node', ['server'], {stdio: 'inherit'});
	if (child.error) throw new gutil.PluginError('server', child.error);
	gutil.log('[server]', 'http://localhost:8080/');
	done();
});

gulp.task('watch', function(done) {
	const child = spawnSync('node', ['server', '--watch'], {stdio: 'inherit'});
	if (child.error) throw new gutil.PluginError('server', child.error);
	gutil.log('[server]', 'http://localhost:8080/');
	done();
});
