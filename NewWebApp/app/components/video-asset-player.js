import AssetPlayer from './asset-player';

export default AssetPlayer.extend({
    tagName: 'video',
    
    didReceiveAttrs() {
        let asset = this.get('asset');

        this.setProperties({
            src: asset.url,
            type: asset.type,
            autoplay: 'autoplay',
            attributeBindings: [ 'autoplay', 'src', 'type', 'onassetdone:onended' ]
        });

        this.bindOptions();
    }
});
