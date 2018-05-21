import Component from '@ember/component';
import layout from '../templates/components/display-content-rect';
import { computed } from '@ember/object';

export default Component.extend({
  layout,

  tagName: 'pre',

  rect: null,

  rectJSON: computed('rect', {
    get() {
      let rect = this.get('rect');
      if (rect) {
        return JSON.stringify(rect.bounds, null, 2);
      }
    }
  })
});
