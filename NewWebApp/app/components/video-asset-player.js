import AssetPlayer from './asset-player';
import { observer } from '@ember/object';

export default AssetPlayer.extend({
    tagName: 'video',
    controls: true,
    autoplay: true,
    playing: true,

    onassetdone() { },
    onpause() { },
    onplay() { },

    playingObserver: observer('playing', function() {
        if (this.get('playing')) {
            this.$()[0].play();
        }
        else {
            this.$()[0].pause();
        }
    }),
    didReceiveAttrs() {
        let asset = this.get('asset');

        this.setProperties({
            src: asset.url,
            type: asset.type,
            attributeBindings: [ 'controls', 'autoplay', 'src', 'type',
                    'onassetdone:onended', 'onpause:onpause', 'onplay:onplay',
                    'playing:playng' ]
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
