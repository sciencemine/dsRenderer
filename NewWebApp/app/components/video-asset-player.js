import AssetPlayer from './asset-player';
import { observer, computed } from '@ember/object';

export default AssetPlayer.extend({
    tagName: 'video',

    options: null,
    callbacks: null,

    onassetdone() { },
    onpause() { },
    onplay() { },

    playingObserver: observer('options.playing', function() {
        if (this.get('options.playing')) {
            this.$()[0].play();
        }
        else {
            this.$()[0].pause();
        }
    }),
    controls: computed('options.controls', function() {
        if ('controls' in this.get('options')) {
            return this.get('options.controls');
        }
        else {
            return false;
        }
    }),
    autoplay: computed('options.autoplay', function() {
        if ('autoplay' in this.get('options')) {
            return this.get('options.autoplay');
        }
        else {
            return true;
        }
    }),
    didReceiveAttrs() {
        let asset = this.get('asset');

        this.setProperties({
            src: asset.url,
            type: asset.type,
            attributeBindings: [ 'controls', 'autoplay', 'src', 'type',
                    // this is the only callback not in the hash
                    'onassetdone:onended',
                    'callbacks.onpause:onpause', 'callbacks.onplay:onplay' ]
        });

        this.bindOptions();
    },
    click(e) {
        if (e.target.paused) {
            e.target.play();
        }
        else {
            e.target.pause();
        }
    }
});
