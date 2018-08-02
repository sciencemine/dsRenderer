import Component from '@ember/component';
import TactileControls from '../mixins/tactile-controls';
import { inject as service } from '@ember/service';
import { observer } from '@ember/object';

export default Component.extend(TactileControls, {
    classNames: [ 'ce-select-container' ],
    state: service(),
    dwellTimeout: null,
    // note that data is an array
    currentSelected: 0,

    select() {
        clearTimeout(this.get('dwellTimeout'));

        if (this.get('ces.length') === 0) {
            let state = this.get('state');
            state.setState(state.previous);
            return;
        }

        this.get('onceselect') (this.get('ces')[this.get('currentSelected')]);
    },
    previous() {
        this._resetTimeout();

        if (this.get('ces.length') === 0) {
            return;
        }

        let ces = this.get('ces');

        this.set('currentSelected', (this.get('currentSelected') + ces.length - 1) % ces.length);
        this._scrollLeft();
    },
    cancel() {
        clearTimeout(this.get('dwellTimeout'));

        let state = this.get('state');
        state.setState(state.previous);
    },
    next() {
        this._resetTimeout();

        if (this.get('ces.length') === 0) {
            return;
        }

        let ces = this.get('ces');

        this.set('currentSelected', (this.get('currentSelected') + 1) % ces.length);
        this._scrollLeft();
    },
    _scrollLeft() {
        let currentCE = this.get('currentSelected');
        let listContainer = this.$('#ce-select-list');
        let listContainerRight = listContainer.offset().left + listContainer.width();
        let el = this.$(`#ce-select-${this.get('ces')[currentCE]._id}`);
        let offsetLeft = el.offset().left;
        let currentScroll = listContainer.scrollLeft();

        if (offsetLeft + el.width() > listContainerRight) {
            listContainer.scrollLeft(currentScroll + offsetLeft - el.width());
        }
        else if (offsetLeft < listContainer.offset().left) {
            listContainer.scrollLeft(currentScroll + offsetLeft - listContainer.width() + el.width());
        }
    },
    _updateHidden() {
        let state = this.get('state');

        if (state.current === state.states.select) {
            this.$().removeClass('hidden');
            this._resetTimeout();
        }
        else {
            this.$().addClass('hidden');
            clearTimeout(this.get('dwellTimeout'));
        }
    },
    stateObserver: observer('state.current', function() {
        let state = this.get('state');
        this._updateHidden();
        this.updateFocus(state.current === state.states.select);
    }),
    didInsertElement() {
        let state = this.get('state');
        this._updateHidden();
        this.updateFocus(state.current === state.states.select);
    },
    _resetTimeout() {
        clearTimeout(this.get('dwellTimeout'));

        let timeout = setTimeout((component) => {
            component.get('ontimeout') ();
        }, this.get('dwell') * 1000, this);

        this.set('dwellTimeout', timeout);
    },
    init() {
        this._super(...arguments);
        this._resetTimeout();
    },
    actions: {
        resetTimeout() {
            this._resetTimeout();
        }
    }
});
