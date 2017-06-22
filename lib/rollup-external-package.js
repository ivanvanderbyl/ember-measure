/* eslint-env node */
var Rollup = require('broccoli-rollup');
var babel = require('rollup-plugin-babel');
var resolve = require('rollup-plugin-node-resolve');

module.exports = function(tree, moduleId, entry, external) {
  let rollup = {
    indent: true,
    external,
    entry,
    dest: [moduleId, 'js'].join('.'),
    format: 'es',
    moduleId,
    plugins: [
      resolve({ jsnext: true, main: true }),
      babel({
        presets: ['stage-2'],
      }),
    ]
  };

  return new Rollup(tree, {
    annotation: moduleId,
    rollup
  });
};
