import AssetPlayer from './asset-player';

export default AssetPlayer.extend({
    tagName: 'video',
    controls: true,
    autoplay: true,

    onassetdone() { },
    onpause() { },
    onplay() { },
    
    didReceiveAttrs() {
        let asset = this.get('asset');

        this.setProperties({
            src: asset.url,
            type: asset.type,
            attributeBindings: [ 'controls', 'autoplay', 'src', 'type',
                    'onassetdone:onended', 'onpause:onpause', 'onplay:onplay' ]
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
