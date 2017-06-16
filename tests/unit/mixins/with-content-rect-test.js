import Ember from 'ember';
import WithContentRectMixin from 'ember-measure/mixins/with-content-rect';
import { module, test } from 'qunit';

module('Unit | Mixin | with content rect');

// Replace this with your real tests.
test('it works', function(assert) {
  let WithContentRectObject = Ember.Object.extend(WithContentRectMixin);
  let subject = WithContentRectObject.create();
  assert.ok(subject);
});
