import AssetPlayer from './asset-player';

export default AssetPlayer.extend({
    tagName: 'video',
    
    didReceiveAttrs() {
        let asset = this.get('asset');

        this.setProperties({
            tagName: 'track',
            src: asset.url,
            attributeBindings: [ 'src' ]
        });

        this.bindOptions();
    }
});
