import Ember from 'ember';
import layout from '../templates/components/resize-example';


export default Ember.Component.extend(WithContentRect, {
  layout,

  didResize(rect) {

  }
});
