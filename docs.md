### bootstrap
* https://v4-alpha.getbootstrap.com/
* Changelogs http://blog.getbootstrap.com/
* Some unexpected changes, mention in one of the changelogs, can't find it now

### react-router-addons-controlled
* No longer exists
* How to support redux instead?

### redux
* mapStateToProps gets called only when state is changed
	* ake sure Object.assign's first parameter is new object

### redux-saga
* https://redux-saga.github.io/redux-saga/index.html
* Main saga is no longer passed while applying middleware, but after using sagaMiddleware.run(mainSaga);

### reselect
* Watch out for using same selector for multiple component instances

### socket.io-client
* Snyk vulnarability

### babel
* https://babeljs.io/
* https://babeljs.io/docs/plugins/preset-latest/
* https://babeljs.io/docs/plugins/preset-stage-0/
* https://tc39.github.io/process-document/ (stage-0 to stage-4 descriptions)
* Each presets contains list of featers (convertors)
* es2015/latest includes "transform-es2015-modules-commonjs"
	* That is why the { "modules": false } option in babelrc is set for es2015
	* { "modules": false } option says that es6 modules shoud be used instead of commonjs
	* What does this mean though? Is this because of webpack, that uses the es6 modules isntead of commonjs?
* Consider using https://babeljs.io/docs/plugins/preset-env/
	* Enables specifications like "add presets for 2 latest versions of set browsers"

### babel-polyfill
* Part of babel repo on github
* Adds support for Object.assign, Promise etc.
* ES2015 includes support for generators, so I don't understand why there are some mentions of them in babel-polyfill?

### postcss-loader
* How do postcss plugin work and what does it support by default?
* Is autoprefixer plugin really needed or does it work without it?
* css-modules supported fully by default?

### snyk
* run `snyk test` to test vulnerabilities
* include it as part of production build

### webpack
* Webpack 2.2 is fully out, check out the December 2016+ migration guides

### webpack-dashboard
* Dashboard will be empty when wrong webpack config is provided
* It is opening node terminal on windows - annoying
* Include it as part of gulp dev

### webpack-dev-server
* Configuring everything for webpack-dev-server is annoying, but suppposedly it is possible to load it in custom express server instead