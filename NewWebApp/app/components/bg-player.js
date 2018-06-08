import Component from '@ember/component';
import PlaylistHandler from '../mixins/playlist-handler';


export default Component.extend(PlaylistHandler, {
    classNames: [ 'background-player' ],
    
    init() {
        this._super(...arguments);

        this.setPlaylist(this.get('playlist'));
    },
    actions: {
        ceDone(/* ce */) {
            if (!this.incrementPlaylist()) {
                this.setPlaylistIndex();
            }
        }
    }
});
