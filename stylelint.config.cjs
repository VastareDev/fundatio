/** @type {import("stylelint").Config} */
module.exports = {
  extends: [
    'stylelint-config-standard-scss'
  ],
  plugins: ['stylelint-scss'],
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss'
    }
  ],
  rules: {
    "scss/at-if-no-null": null,
    'selector-class-pattern': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global']
      }
    ],
    'scss/dollar-variable-pattern': [
      '^[_a-z][a-z0-9-]*$',
      {
        message: 'SCSS variables should be lowercase, hyphen separated, and may be prefixed with _ for internal use.'
      }
    ],
    'scss/at-function-pattern': [
      '^[_a-z][a-z0-9-]*$',
      {
        message: 'SCSS function names should be lowercase, hyphen separated, and may be prefixed with _ for internal use.'
      }
    ],
    'scss/at-mixin-pattern': [
      '^[_a-z][a-z0-9-]*$',
      {
        message: 'SCSS mixin names should be lowercase, hyphen separated, and may be prefixed with _ for internal use.'
      }
    ],
    'scss/no-global-function-names': null,
    'no-duplicate-selectors': null,
    'no-descending-specificity': null,
    'declaration-property-value-no-unknown': null,
    'block-no-empty': true,
    'comment-no-empty': true
  },
  ignoreFiles: ['dist/**/*.css', 'node_modules/**/*']
};
