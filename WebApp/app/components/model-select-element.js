import Component from '@ember/component';

export default Component.extend({
  tagName: "button",
  classNames: [ "list-group-item" ],

  muted: true,
  name: "",
  description: "",
  modelIdentifier: "",
  videos: null,

  init() {
    this._super(...arguments);

    this.set('videos', []);
  },
  mouseEnter() {
    this.set('muted', false);
  },
  mouseLeave() {
    this.set('muted', true);
  },
  actions: {
    doNothing() {

    }
  }
});
