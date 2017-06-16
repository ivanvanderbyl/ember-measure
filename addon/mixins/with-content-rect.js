import Ember from 'ember';
import ResizeObserver from 'resize-observer';
import getContentRect from '../utils/get-content-rect';
import run from 'ember-runloop';

const types = [
  'client',
  'offset',
  'scroll',
  'bounds',
  'margin'
];

export default Ember.Mixin.create({

  types,

  init() {
    this._super(...arguments);
    this.runloopAwareMeasure = () => {
      run.join(this, this.measure);
    };
  },

  /**
   * Called once per run loop when this element has resized
   * @param {DOMContentRect} The DOM content rect
   */
  didResize(/*rect*/){
    if (this._t0) {
      let _t1 = performance.now();
      console.log(_t1 - this._t0);
      this._t0 = null;
    }
  },

  /**
   * The coordinate Rect of this element
   * @type {DOMContentRect}
   */
  contentRect: null,

  didInsertElement() {
    this._super.apply(...arguments);
    this._resizeObserver = new ResizeObserver(this.runloopAwareMeasure)
    this._resizeObserver.observe(this.element);

    this._t0 = performance.now();
  },

  willDestroyElement() {
    this._super.apply(...arguments);
    this._resizeObserver.disconnect(this.element);
  },

  measure(entries) {
    if (!this.element) {return}

    let contentRect = getContentRect(
      this.element,
      this.types
    )

    if (entries) {
      contentRect.entry = entries[0].contentRect
    }

    this.set('contentRect', contentRect);
    this.didResize(contentRect);
  }
});
