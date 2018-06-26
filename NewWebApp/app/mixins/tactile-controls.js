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

            let char =  String.fromCharCode(e.keyCode).toLowerCase();

            if (tMap.select.map((c)=>{ return c.toLowerCase() }).includes(char)) {
                this.select(e);
            }
            else if (tMap.previous.map((c)=>{ return c.toLowerCase() }).includes(char)) {
                this.previous(e);
            }
            else if (tMap.cancel.map((c)=>{ return c.toLowerCase() }).includes(char)) {
                this.cancel(e);
            }
            else if (tMap.next.map((c)=>{ return c.toLowerCase() }).includes(char)) {
                this.next(e);
            }
        }
    }
});
