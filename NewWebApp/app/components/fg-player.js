import Component from '@ember/component';
import TactileControls from '../mixins/tactile-controls';
import { inject as service } from '@ember/service';
import { observer } from '@ember/object';

export default Component.extend(TactileControls, {
    classNames: [ 'foreground-player' ],
    state: service(),

    stateObserver: observer('state.current', function() {
        let state = this.get('state');

        this.set('focus', state.current === state.states.playing);
    }),
    didInsertElement() {
        let state = this.get('state');

        this.set('focus', state.current === state.states.playing);
    }
});
