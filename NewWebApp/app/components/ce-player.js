import Component from '@ember/component';
import PlaylistHandler from '../mixins/playlist-handler';

export default Component.extend(PlaylistHandler, {
    classNames: [ 'ce-player' ],
    // playlistIndex: 0,
    isTeaser: true,

    init() {
        this._super(...arguments);

        this.setPlaylist(this.get('ce.playlist'))

        // if the first thing in the playlist is a teaser, adjust the playlist index
        if (!Array.isArray(this.get('currentItem'))) {
            this.incrementPlaylist();
        }
    },
    actions: {
        assetDone(asset) {
            let ce = this.get('ce');

            // go to the next playlist item and send a callback if the playlist is over
            if (this.incrementPlaylist()) {
                let playlistOver = this.get('playlsitOver');
                
                if (playlistOver) {
                    playlistOver(ce);
                }
            }
        }
    }
});