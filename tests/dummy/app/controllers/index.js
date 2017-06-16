import Ember from 'ember';

export default Ember.Controller.extend({

  isAnimating: false,

  actions: {
    toggleAnimate() {
      this.toggleProperty('isAnimating');
    }
  }
});
