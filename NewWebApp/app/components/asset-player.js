import Component from '@ember/component';
// assets need to emit an event when they are finished doing their thing

export default Component.extend({
    classNames: [ 'asset-player' ],
    isTeaser: false,
    
    didReceiveAttrs() {
        this._super(...arguments);

        let asset = this.get('asset');

        switch (asset.type) {
            // fix if it is a video
            case 'video/webm':
                this.setProperties({
                    tagName: 'video',
                    src: asset.url,
                    type: asset.type,
                    autoplay: 'autoplay',
                    attributeBindings: [ 'autoplay', 'src', 'type', 'onassetdone:onended' ]
                });

                this.set('onended', () => console.log('ba'));
            break;
            // fix if it is a sub
            case 'text/vtt':
                this.setProperties({
                    tagName: 'track',
                    src: asset.url,
                    attributeBindings: [ 'src' ]
                });
            break;
            // if image
            case 'image/png':
                this.setProperties({
                    tagName: 'img',
                    src: asset.url,
                    attributeBindings: [ 'src' ]
                });
                
                if (asset.options.duration) {
                    setTimeout(this.get('onassetdone'), asset.options.duration * 1000);
                }
            break;
            case 'image/webp':
                this.setProperties({
                    tagName: 'img',
                    src: asset.url,
                    attributeBindings: [ 'src' ]
                });

                if (asset.options.duration) {
                    setTimeout(this.get('onassetdone'), asset.options.duration * 1000);
                }
            break;
        }

        for (let option in asset.options) {
            this.set(option, asset.options[option]);
            this.get('attributeBindings').push(option);
        }
    }
});
