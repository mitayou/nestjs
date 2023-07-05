module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'prettier'],
  root: true,
  env: {
    node: true,
    jest: true
  },
  // norePatterns: [],
  ignorePatterns: ['node_modules/', 'dist/', '.eslintrc.js', 'webpack.config.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // 不允许使用混合空格和制表符进行缩进
    'no-mixed-spaces-and-tabs': 2,
    'template-curly-spacing': [2, 'never']
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        'prettier/prettier': [
          'warn',
          {
            trailingComma: 'none',
            semi: false
          }
        ],
        '@typescript-eslint/ban-types': 0,
        'no-trailing-spaces': 0
      }
    }
  ]
}
