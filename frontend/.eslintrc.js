module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['react', 'prettier'],
  rules: {
    'react/jsx-props-no-spreading': ['off'],
    'react/state-in-constructor': 0,
    'consistent-return': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'quotes': 'off',
    'linebreak-style': 'off',
    'comma-dangle': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', 'jsx'],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  env: {
    browser: true,
  },
};
