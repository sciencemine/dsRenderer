import Component from '@ember/component';
import { isNone } from '@ember/utils';

export default Component.extend({
    classNames: [ 'menu-overlay' ],

    menuBarStyle: '',
    menuBarDirection: '',
    renderMenu: true,
    menuTimeout: null,
    
    init() {
        this._super(...arguments);

        let dsm = this.get('dsm');

        if (isNone(dsm)) {
            return;
        }

        switch (dsm.config.menuLocale) {
            case "right":
                this.setProperties({
                    menuBarStyle: 'menu-right',
                    menuBarDirection: 'vertical'
                });
            break;
            case "bottom":
                    this.setProperties({
                    menuBarStyle: 'menu-bottom',
                    menuBarDirection: 'horizontal',
                    // useDropUp: true
                });
            break;
            case "left":
                this.setProperties({
                    menuBarStyle: 'menu-left',
                    menuBarDirection: 'vertical'
                });
            break;
            default:
                this.setProperties({
                    menuBarStyle: 'menu-top',
                    menuBarDirection: 'horizontal'
                });
            break;
        }

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
    },
    actions: {
        ceSelected(ceID) {
            let callback = this.get('onClickCallback');

            if (callback) {
                callback(ceID);
            }
        },
        toggleMenu() {
            this.mouseEnter();
        }
    }
});
