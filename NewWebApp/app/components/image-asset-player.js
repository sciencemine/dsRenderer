import AssetPlayer from './asset-player';

export default AssetPlayer.extend({
    tagName: 'video',
    
    didReceiveAttrs() {
        let asset = this.get('asset');

        this.setProperties({
            tagName: 'img',
            src: asset.url,
            attributeBindings: [ 'src' ]
        });
        
        if ('options' in asset) {
            if ('duration' in asset.options) {
                setTimeout(this.get('onassetdone'), asset.options.duration * 1000);
            }
        }

        this.bindOptions();
    }
});
