module.exports = {
  root: true,
  extends: [
    '@emiolo/eslint-config/node',
    '@emiolo/eslint-config/ts',
    '@emiolo/eslint-config/prettier',
  ],
  ignorePatterns: ['node_modules', 'lib', 'dist', '.thalamus', '.nuxt'],
  rules: {
    'import/extensions': ['off'],
    'import/prefer-default-export': ['off'],
    'no-useless-constructor': ['off'],
    'class-methods-use-this': ['off'],
    'no-return-await': ['off'],
    '@typescript-eslint/no-empty-function': ['off'],
    'import/no-extraneous-dependencies': ['off'],
    'max-classes-per-file': ['off'],
    complexity: ['off'],
    // 'sort-imports': ['error'],
  },
}
