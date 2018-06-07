import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    classNames: [ 'ce-player' ],
    playlistIndex: 0,
    isTeaser: true,

    init() {
        this._super(...arguments);
        
        // if the first thing in the playlist is a teaser, adjust the playlist index
        if (!this.get('isTeaser') && !Array.isArray(this.get('ce.playlist')[0])) {
            this.incrementProperty('playlistIndex');
        }
    },
    
    currentItem: computed('ce', 'playlistIndex', function() {
        return this.get('ce.playlist')[this.get('playlistIndex')];
    }),
    actions: {
        assetDone(asset) {
            let ce = this.get('ce');

            // go to the next playlist item and send a callback if the playlist is over
            if (this.incrementProperty('playlistIndex') === ce.playlist.length) {
                let playlistOver = this.get('playlsitOver');
                
                if (playlistOver) {
                    playlistOver(ce);
                }
            }
        },
        teaserDone() {
            
        }
    }
});