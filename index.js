/* eslint-env node */
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

    this.import(path.posix.join('vendor', 'resize-observer.js'));
  },

  treeForVendor() {
    let nodeModulesPath = 'node_modules';
    let entry = path.posix.join(nodeModulesPath, 'resize-observer-polyfill', 'src', 'index.js');
    return rollupExternalPackage('vendor', 'resize-observer', entry, []);
  }
};
