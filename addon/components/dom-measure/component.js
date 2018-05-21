import Component from '@ember/component';
import layout from './template';
import WithContentRect from '../../mixins/with-content-rect';

export default Component.extend(WithContentRect, {
  layout,
});
