import Component from '@ember/component';

export default Component.extend({
    classNames: [ 'menu-bar-container' ],
    renderMenu: true,
    menuTimeout: null,
    
    init() {
        this._super(...arguments);

        this.mouseLeave();
    },
    mouseEnter() {
        this.set('renderMenu', true);

        clearTimeout(this.get('menuTimeout'));
    },
    mouseLeave() {
        clearTimeout(this.get('menuTimeout'));

        let timeout = setTimeout((component) => {
            // hide pop overs
            component.set('renderMenu', false);
        }, this.get('dsm.config.menuDwell') * 1000, this)

        this.set('menuTimeout', timeout);
    },
    actions: {
        openMenu() {
            this.mouseEnter();
        }
    }
});
