module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
    }
};

module.exports = {
    extends: ['airbnb', 'prettier', 'prettier/react'],
    plugins: ['react', 'prettier'],
    parser: 'babel-eslint',
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      }
    },
    env: {
      jest: true,
      browser: true
    },
    rules: {
      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.js', '.jsx']
        }
      ],
      'prettier/prettier': [
        'error',
        {
          trailingComma: 'none',
          singleQuote: true,
          printWidth: 80,
          jsxSingleQuote: true
        }
      ],
      'react/prop-types': 0,
      'react/no-deprecated': 0,
      'react/no-unsafe': 1,
      'no-underscore-dangle': 0,
      'import/imports-first': ['error', 'absolute-first'],
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'import/newline-after-import': 'error'
    },
    globals: {
      window: true,
      document: true,
      localStorage: true
    }
  };