import Component from '@ember/component';
import PlaylistHandler from '../mixins/playlist-handler';
import { observer } from '@ember/object';

export default Component.extend(PlaylistHandler, {
    classNames: [ 'ce-player' ],
    isTeaser: true,
    
    onselect() { },
    oncedone() { },
    onassetstart() { },
    onassetdone() { },
    onplay() { },
    onpause() { },

    didInsertElement() {
        this.assetStart();
    },
    updatePlaylist() {
        this.setPlaylist(this.get('ce.playlist'));
        this.setPlaylistIndex();
        this.set('attributeBindings', [ 'onselect:onclick' ])

        // if the first thing in the playlist is a teaser, adjust the playlist index
        if (!this.get('isTeaser')) {
            if (!Array.isArray(this.get('currentItem'))) {
                this.incrementPlaylist();
            }

            this.assetStart();
        }
    },
    ceObserver: observer('ce', function() {
        this.updatePlaylist();
    }),
    init() {
        this._super(...arguments);
        this.updatePlaylist();
    },
    assetStart() {
        if (!this.get('isTeaser')) {
            this.get('onassetstart') (this.get('currentItem'));
        }
    },
    actions: {
        primaryAssetDone(primaryAsset, e) {
            this.get('onassetdone') (e, primaryAsset);
            // go to the next playlist item and send a callback if the playlist is over
            if (!this.incrementPlaylist()) {
                this.get('oncedone') ();
            }
            else {
                this.assetStart();
            }
        },
        assetDone(asset, e) {
            this.get('onassetdone') (e, asset);
        }
    }
});