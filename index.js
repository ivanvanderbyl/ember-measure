'use strict';
var rollupExternalPackage = require('./lib/rollup-external-package');
var path = require('path');

module.exports = {
  name: 'ember-measure',

  included() {
    this._super.included.apply(this, arguments);

    if (!this.import) {
      this.ui.errorLine('Ember CLI is outdated and cannot compile ember-measure');
      return
    }

    this.import(path.posix.join('vendor', 'resize-observer-polyfill.js'));
  },

  treeForVendor() {
    let babel = this.addons.find((addon) => addon.name === 'ember-cli-babel');
    let options = babel.buildBabelOptions(this.options.babel)
    let nodeModulesPath = 'node_modules';
    let entry = path.posix.join(nodeModulesPath, 'resize-observer-polyfill', 'src', 'index.js');
    let rollupTree = rollupExternalPackage('vendor', 'resize-observer-polyfill', entry, [], options);

    return babel.transpileTree(rollupTree, {
      'ember-cli-babel': {
        compileModules: true
      }
    });
  }
};
