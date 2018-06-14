import Component from '@ember/component';

export default Component.extend({
    classNames: [ 'ce-select-container' ],
    dwellTimeout: null,

    resetTimeout() {
        clearTimeout(this.get('dwellTimeout'));

        let timeout = setTimeout((component) => {
            component.get('ontimeout') ();
        }, this.get('dwell') * 1000, this);

        this.set('dwellTimeout', timeout);
    },
    init() {
        this._super(...arguments);
        this.resetTimeout();
    },
    actions: {
        resetTimeout() {
            this.resetTimeout();
        }
    }
});
