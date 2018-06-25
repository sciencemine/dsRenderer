import Mixin from '@ember/object/mixin';
import { isNone } from '@ember/utils';

export default Mixin.create({
    tactileMap: null,
    // dummy methods
    select() { console.log('select'); },
    previous() { console.log('previous'); },
    cancel() { console.log('cancel'); },
    next() { console.log('next'); },

    updateFocus(arg) {
        if (isNone(this.$())) {
            return;
        }

        if (arg) {
            // note: to get keyevents the element has to be the top index and have focus
            this.$().attr('tabindex', 100);
            this.$().focus();
        }
        else {
            this.$().attr('tabindex', -100);
            this.$().blur();
        }
    },
    keyDown(e) {
        if (this.$().is(':focus')) {
            let tMap = this.get('tactileMap'); // subject to change. please

            if (isNone(tMap)) {
                return;
            }

            switch(String.fromCharCode(e.keyCode).toLowerCase()) {
                case tMap.select.toLowerCase():
                    this.select(e);
                    break;
                case tMap.previous.toLowerCase():
                    this.previous(e);
                    break;
                case tMap.cancel.toLowerCase():
                    this.cancel(e);
                    break;
                case tMap.next.toLowerCase():
                    this.next(e);
                    break;
            }
        }
    }
});
