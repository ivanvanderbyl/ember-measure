/* eslint-env node */
var Rollup = require('broccoli-rollup');
var babel = require('rollup-plugin-babel');

module.exports = function(tree, moduleName, entry, external) {

  let rollup = {
    indent: false,
    external,
    entry,
    dest: [moduleName, 'js'].join('.'),
    format: 'amd',
    cache: false,
    moduleId: moduleName,
    plugins: [
      babel({
        presets: ['stage-2']
      }),
    ]
  };

  return new Rollup(tree, {
    annotation: moduleName,
    rollup
  });
};
