import Ember from 'ember';
import layout from './template';
import WithContentRect from '../../mixins/with-content-rect';

export default Ember.Component.extend(WithContentRect, {
  layout,
});
