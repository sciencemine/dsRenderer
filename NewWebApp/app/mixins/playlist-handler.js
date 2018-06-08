import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Mixin.create({
    _playlist: null,
    _playlistIndex: null,

    // necessary to set up the playlist array
    init() {
        this._super(...arguments);

        this.setProperties({
            _playlist: A(),
            _playlistIndex: 0
        });
    },
    // // the current item set by the handler
    currentItem: computed('_playlistIndex', '_playlist', function() {
        return this.get('_playlist')[this.get('_playlistIndex')];
    }).readOnly().volatile(),
    // returns a boolean if after incrementing there is still a valid next item
    incrementPlaylist() {
        let result = this.incrementProperty('_playlistIndex') < this.get('_playlist').length;
        // since currentItem is volatile we have to notify of the property change
        this.notifyPropertyChange('currentItem');
        // return the result
        return result;
    },
    hasNext() {
        return this.get('_playlistIndex') < (this.get('_playlist').length - 1);
    },
    setPlaylist(playlist) {
        this.set('_playlist', playlist);
        // since currentItem is volatile we have to notify ofthe property change
        this.notifyPropertyChange('currentItem');
    }
});
