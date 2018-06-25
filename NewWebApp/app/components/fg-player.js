import Component from '@ember/component';
import TactileControls from '../mixins/tactile-controls';
import { inject as service } from '@ember/service';
import { observer } from '@ember/object';

export default Component.extend(TactileControls, {
    classNames: [ 'foreground-player' ],
    state: service(),
    playing: true,

    _pause() {
        this.set('playing', false);
        this.get('state').setState('select');
    },
    select() {
        this._pause();
    },
    previous() {
        this._pause();
    },
    cancel() {
        this._pause();
    },
    next() {
        this._pause();
    },
    stateObserver: observer('state.current', function() {
        let state = this.get('state');
        let isFocus = state.current === state.states.playing;
        this.updateFocus(isFocus);
        this.set('playing', isFocus);
    }),
    didInsertElement() {
        let state = this.get('state');
        let isFocus = state.current === state.states.playing;
        this.updateFocus(isFocus);
        this.set('playing', isFocus);
    }
});
