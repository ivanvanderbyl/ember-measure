import Component from '@ember/component';
import layout from './template';
import WithContentRect from 'ember-measure/with-content-rect';
import { computed } from '@ember/object';

export default Component.extend(WithContentRect, {
  layout,

  tagName: 'div',

  classNames: ['chart'],

  width: computed.alias('contentRect.client.width'),
  height: computed.alias('contentRect.client.height'),

});
