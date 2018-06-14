import Component from '@ember/component';
import PlaylistHandler from '../mixins/playlist-handler';

export default Component.extend(PlaylistHandler, {
    classNames: [ 'ce-player' ],
    isTeaser: true,
    oncedone() { },
    onselect() { },

    didReceiveAttrs() {
        this.setPlaylist(this.get('ce.playlist'));
        this.setPlaylistIndex();
        this.set('attributeBindings', [ 'onselect:onclick' ])

        // if the first thing in the playlist is a teaser, adjust the playlist index
        if (!this.get('isTeaser') && !Array.isArray(this.get('currentItem'))) {
            this.incrementPlaylist();
        }
    },
    actions: {
        assetDone(/* asset */) {
            // go to the next playlist item and send a callback if the playlist is over
            if (!this.incrementPlaylist()) {
                this.get('oncedone') ();
            }
        }
    }
});