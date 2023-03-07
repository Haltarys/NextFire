const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

module.exports = {
  '*.{css,ts,tsx}': [
    'yarn run prettier --write --ignore-unknown',
    buildEslintCommand,
  ],
};
