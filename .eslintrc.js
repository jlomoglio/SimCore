// http://eslint.org/docs/user-guide/configuring
module.exports = {
    "root": true,
    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module"
    },
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    "extends": ["standard"],
    // required to lint *.vue files
    "plugins": ["html"],
    // add your custom rules here
    "rules": {
        // allow paren-less arrow functions
        "arrow-parens": 0,
        // allow async-await
        "generator-star-spacing": 0,
        // allow debugger during development
        "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,

        "indent": ["error", 4],

        "no-tabs": 0,

        "no-trailing-spaces": ["error", { "skipBlankLines": true }],

        "no-return-assign": 0,

        "brace-style": 0,

        "semi": ["error", "never"],

        "dot-location": 0,

        "space-before-blocks": ["error", "always"],

        "space-before-function-paren": 0

    }
}
