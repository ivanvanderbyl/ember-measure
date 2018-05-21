import Controller from '@ember/controller';

export default Controller.extend({

  isAnimating: false,

  actions: {
    toggleAnimate() {
      this.toggleProperty('isAnimating');
    }
  }
});
