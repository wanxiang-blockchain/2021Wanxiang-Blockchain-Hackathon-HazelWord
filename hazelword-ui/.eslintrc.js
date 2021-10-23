module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-tabs" : "off",
      // allow paren-less arrow functions
      'arrow-parens': 0,
      // allow async-await
      'generator-star-spacing': 0,
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
      "vue/max-attributes-per-line": ["error", {
        "singleline": 3,
        "multiline": {
          "max": 1,
          "allowFirstLine": false
        }
      }],
      "vue/html-indent": ["error", 2 , {
        "attribute": 1,
        "baseIndent": 1,
        "closeBracket": 0,
        "alignAttributesVertically": true,
        "ignores": []
      }],
      "vue/attributes-order": ["error", {
        "order": [
          "DEFINITION",
          "LIST_RENDERING",
          "CONDITIONALS",
          "RENDER_MODIFIERS",
          "GLOBAL",
          "UNIQUE",
          "TWO_WAY_BINDING",
          "OTHER_DIRECTIVES",
          "OTHER_ATTR",
          "EVENTS",
          "CONTENT"
        ],
        "alphabetical": false
      }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    'wx': true
  }
}
