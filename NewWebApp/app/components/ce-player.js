import Component from '@ember/component';
import PlaylistHandler from '../mixins/playlist-handler';

export default Component.extend(PlaylistHandler, {
    classNames: [ 'ce-player' ],
    isTeaser: true,

    didReceiveAttrs() {
        this.setPlaylist(this.get('ce.playlist'));
        this.setPlaylistIndex();

        // if the first thing in the playlist is a teaser, adjust the playlist index
        if (!Array.isArray(this.get('currentItem'))) {
            this.incrementPlaylist();
        }
    },
    actions: {
        assetDone(/* asset */) {
            // go to the next playlist item and send a callback if the playlist is over
            if (!this.incrementPlaylist()) {
                this.get('ceDone') (this.get('ce'));
            }
        }
    }
});