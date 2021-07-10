module.exports = {
  globals: {
    JSX: true,
  },
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  parser: '@typescript-eslint/parser',
  globals: {
    JSX: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['dist'],
  plugins: ['react', '@typescript-eslint', 'import'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['node_modules/', 'node_modules/@types'],
      },
      typescript: {},
    },
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
    'no-use-before-define': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    'import/no-extraneous-dependencies': [0],
    'import/no-unresolved': [1],
    '@typescript-eslint/camelcase': 'off',
    'react/no-array-index-key': 'off',
    camelcase: 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'monorepo/no-internal-import': 'off',
    'no-unused-vars': [1, { args: 'none' }],
    semi: 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'prefer-destructuring': [
      1,
      {
        array: true,
        object: true,
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'no-return-assign': 'off',
    'no-param-reassign': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/destructuring-assignment': 'off',
  },
}
