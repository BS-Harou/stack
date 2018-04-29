module.exports = {
	"env": {
		"node": true,
		"browser": true,
		"commonjs": true,
		"es6": true
	},
	"extends": ["eslint:recommended", "plugin:react/recommended"],
	"parser": "babel-eslint",
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"sourceType": "module"
	},
	"plugins": [
		"react"
	],
	"globals": {
		"__DEV__": true,
		"__STAGING__": true,
		"__PRODUCTION__": true,
		"__CURRENT_ENV__": true,
		"__base": true,
		"__server": true,
	},
	"rules": {
		"indent": ["error", "tab", {"MemberExpression": 0}],
		"linebreak-style": ["error", "unix"],
		"quotes": ["error", "single"],
		"semi": ["error", "always"],
		"no-debugger": 0,
		"no-console": 0,
		"no-unused-vars": 1,
		"react/no-string-refs": 0,
		"strict": 0
	}
};
