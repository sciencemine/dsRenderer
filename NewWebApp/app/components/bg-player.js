import Component from '@ember/component';
import PlaylistHandler from '../mixins/playlist-handler';
import TactileControls from '../mixins/tactile-controls';
import { inject as service } from '@ember/service';
import { observer } from '@ember/object';

export default Component.extend(PlaylistHandler, TactileControls, {
    classNames: [ 'background-player' ],
    attributeBindings: [ 'onmousemove' ],

    state: service(),
    
    select() { this.onmousemove(); },
    previous() { this.onmousemove(); },
    cancel() { this.onmousemove(); },
    next() { this.onmousemove(); },
    
    stateObserver: observer('state.current', function() {
        let state = this.get('state');

        this.updateFocus(state.current === state.states.idle);
    }),
    init() {
        this._super(...arguments);

        this.setPlaylist(this.get('playlist'));
    },
    didInsertElement() {
        let state = this.get('state');

        this.updateFocus(state.current === state.states.idle);
    },
    actions: {
        ceDone(/* ce */) {
            if (!this.incrementPlaylist()) {
                this.setPlaylistIndex();
            }
        }
    }
});
