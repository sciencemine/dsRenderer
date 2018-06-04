import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    classNames: [ 'ce-player' ],
    playlistIndex: 0,
    currentItem: computed('ce', 'playlistIndex', function() {
        return this.get('ce.playlist')[this.get('playlistIndex')];
    })
});
